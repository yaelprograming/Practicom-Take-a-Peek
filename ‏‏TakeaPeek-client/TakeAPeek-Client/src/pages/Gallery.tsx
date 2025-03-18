
import { useEffect, useState } from 'react';
import {
    Box,
    Breadcrumbs,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Link,
    CircularProgress,
    Typography,
    InputAdornment,
    TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import FolderIcon from '@mui/icons-material/Folder';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const API_BASE_URL = 'http://localhost:5293'; // עדכן לכתובת המתאימה שלך

export default function Gallery() {

    interface File {
        id: string;
        name: string; // שם הקובץ כפי שמגיע מהשרת
        fileType: string; // סוג הקובץ
        size: number; // גודל הקובץ
        s3Key: string; // מפתח ה-S3
    }

    interface Folder {
        id: string;
        name: string;
    }


    const [files, setFiles] = useState<File[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [breadcrumb, setBreadcrumb] = useState<{ id: string; name: string }[]>([]);
    const [currentFolder, setCurrentFolder] = useState<string | null>(null); // הגדרת הסוג כ-string | null
    const [loading, setLoading] = useState(true);
    // const[savaData, setSaveData] = useState<any>([]);

    //חיפוש תיקייה וקבצים
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // סינון התיקיות והקבצים לפי החיפוש
    const filteredFolders = folders.filter((folder) =>
        folder?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredFiles = files.filter((file) =>
        file?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //חיפוש תיקייה וקבצים
    const deleteFileOrFolder = async (fileId: string, type: string) => {
        console.log('Deleting file or folder:', fileId, type);
        console.log(`delete: ${API_BASE_URL}/${type}/${fileId}`);
        try {
            await axios.delete(`${API_BASE_URL}/${type}/${fileId}`);
           
            if (type === 'folders') {
                setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== fileId));
            } else if (type === 'files') {
                setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
            }

            fetchData(null);
        } catch (error) {
            console.error('Error deleting file or folder:', error);
        }
    };    

    useEffect(() => {
        fetchData(currentFolder);
    }, [currentFolder]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/folders`)
            .then(response => {
                console.log(response.data);

            })
            .catch(error => console.error(error));
    }, []);

    const fetchData = async (folderId: string | null = '0') => {
        setLoading(true);
        // setFolders([]);
        // setFiles([]);
        try {
            console.log('Fetching data for folder:', folderId);
            const url = folderId
                ? `${API_BASE_URL}/folders/${folderId}/contents`
                : `${API_BASE_URL}/folders/0/contents`;
            console.log('Fetching from URL:', url); // 🔹 בדיקה שהכתובת תקינה
            const { data } = await axios.get(url);

            console.log('now ! from server: !!!Data received:', data);  // 🔹 בדיקה אם הנתונים באמת מגיעים

            setFolders(data.folders);
            setFiles(data.files);
            console.log('state: !!!!!!!Updated folders:', data.folders);  // 🔹 בדיקה אם folders מתעדכן
            console.log(' state: !!!!!!!Updated files:', data.files);
            console.log(' state: !!!!!!!Updated files name:', data.files[0].fileName);
            // עדכון Breadcrumbs
            const breadcrumbRes = await axios.get(folderId ? `${API_BASE_URL}/folders/${folderId}/breadcrumb` : `${API_BASE_URL}/folders/0/breadcrumb`);
            setBreadcrumb(breadcrumbRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
            {/* כותרת */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                גלריה
            </Typography>
            {/* חיפוש תיקייה וקבצים */}
            <Box sx={{ marginBottom: 3 }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="חפש לפי שם קובץ או תיקייה"
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                />
            </Box>
            {/* חיפוש תיקייה וקבצים */}
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginBottom: 3 }}>

                <Link
                    color={currentFolder === null ? 'textPrimary' : 'inherit'}
                    onClick={() => setCurrentFolder(null)} // חזרה לתיקיית השורש
                    sx={{ cursor: 'pointer', fontSize: '1rem' }}
                >
                    Gallery
                </Link>

                {breadcrumb.map((folder, index) => (
                    <Link
                        key={folder.id}
                        color={index === breadcrumb.length - 1 ? 'textPrimary' : 'inherit'}
                        onClick={() => setCurrentFolder(folder.id)}
                        sx={{ cursor: 'pointer', fontSize: '1rem' }}
                    >
                        {folder.name}
                    </Link>
                ))}
            </Breadcrumbs>

            {/* תוכן */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (

                <ImageList variant="masonry" cols={3} gap={16}>
                    {/* תיקיות */}
                    {filteredFolders.map((folder) => (
                        <ImageListItem
                            key={folder.id}
                            onClick={() => setCurrentFolder(folder.id)}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                padding: 2,
                                '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' },
                            }}
                        >
                            <FolderIcon sx={{ fontSize: 60, color: '#f1c40f', marginBottom: 1 }} />
                            <Typography variant="subtitle1" align="center">
                                {folder.name}
                            </Typography>
                            {/* כפתורים מתחת לתיקייה */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 1,
                                    marginTop: 1,
                                }}
                            >
                                <IconButton sx={{ color: '#1976d2' }}>
                                    <DownloadIcon />
                                </IconButton>
                                <IconButton sx={{ color: '#1976d2' }}>
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => deleteFileOrFolder(folder.id, "folders")}
                                    sx={{ color: '#d32f2f' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </ImageListItem>
                    ))}

                    {/* קבצים */}
                    {filteredFiles.map((file) => (
                        <ImageListItem
                            key={file.id}
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden',
                                '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' },
                            }}
                        >
                            <img
                                src={`https://your-s3-bucket-url/${file.name}.${file.fileType}`} // שימוש ב-s3Key
                                alt={file.name}

                                loading="lazy"
                                style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                            />

                            <ImageListItemBar
                                title={file.name}
                                actionIcon={
                                    <Box>
                                        <IconButton sx={{ color: 'white' }}>
                                            <DownloadIcon />
                                        </IconButton>
                                        <IconButton sx={{ color: 'white' }}>
                                            <ShareIcon />
                                        </IconButton>
                                        <IconButton sx={{ color: 'white' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            )}
        </Box>
    );
}