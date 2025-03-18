
// import * as React from 'react';
// import { Box, Breadcrumbs, IconButton, ImageList, ImageListItem, ImageListItemBar, Modal, Typography, Link, TextField } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DownloadIcon from '@mui/icons-material/Download';
// import ShareIcon from '@mui/icons-material/Share';
// import FolderIcon from '@mui/icons-material/Folder';
// import { useState } from 'react';
// import downloadFile from '../hooks/Download';

// const fileStructure = {
//     root: {
//         "Folder 1": {
//             "Subfolder 1": {
//                 "image1.jpg": "https://images.unsplash.com/photo-1549388604-817d15aa0110",
//             },
//             "image2.jpg": "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
//         },
//         "Folder 2": {
//             "image3.jpg": "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
//         },
//         "image4.jpg": "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
//     }
// };

// export default function Gallery() {
//     const [currentPath, setCurrentPath] = useState(['root']);
//     const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

//     const navigateToFolder = (folder: string) => {
//         setCurrentPath([...currentPath, folder]);
//     };

//     const goBack = (index: number) => {
//         setCurrentPath(currentPath.slice(0, index + 1));
//     };

//     const handleOpen = (img: string) => {
//         setSelectedImage(img);
//     };

//     const handleClose = () => {
//         setSelectedImage(undefined);
//     };

//     const getCurrentFolderContent = (pathArray: string[], structure: any) => {
//         return pathArray.reduce((acc, key) => acc[key], structure);
//     };

//     const currentFolder = getCurrentFolderContent(currentPath, fileStructure);
    
//     return (
//         <Box sx={{ width: '100%', height: 450, overflowY: 'scroll', p: 2 }}>
//             {/* Breadcrumbs for navigation */}
//             <Breadcrumbs separator="/" aria-label="breadcrumb">
//                 {currentPath.map((folder, index) => (
//                     <Link
//                         key={folder}
//                         color={index === currentPath.length - 1 ? 'textPrimary' : 'inherit'}
//                         onClick={() => goBack(index)}
//                         sx={{ cursor: 'pointer' }}>
//                         {folder}
//                     </Link>
//                 ))}
//             </Breadcrumbs>
            
//             <ImageList variant="masonry" cols={3} gap={8}>
//                 {Object.entries(currentFolder).map(([name, content]) => (
//                     typeof content === 'object' ? (
//                         <ImageListItem key={name} onClick={() => navigateToFolder(name)} style={{ cursor: 'pointer' }}>
//                             <FolderIcon sx={{ fontSize: 60, color: '#f1c40f' }} />
//                             <ImageListItemBar title={name} />
//                         </ImageListItem>
//                     ) : (
//                         <ImageListItem key={name}>
//                             <img
//                                 src={typeof content === 'string' ? content : undefined}
//                                 alt={name}
//                                 loading="lazy"
//                                 onClick={() => typeof content === 'string' && handleOpen(content)}
//                                 style={{ cursor: 'pointer' }}
//                             />
//                             <ImageListItemBar
//                                 title={name}
//                                 actionIcon={
//                                     <Box>
//                                         <IconButton onClick={() => typeof content === 'string' && downloadFile(content, name)} sx={{ color: 'white' }}>
//                                             <DownloadIcon />
//                                         </IconButton>
//                                         <IconButton sx={{ color: 'white' }}>
//                                             <ShareIcon />
//                                         </IconButton>
//                                         <IconButton sx={{ color: 'white' }}>
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </Box>
//                                 }
//                             />
//                         </ImageListItem>
//                     )
//                 ))}
//             </ImageList>

//             <Modal open={!!selectedImage} onClose={handleClose}>
//                 <Box sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: '80%',
//                     maxHeight: '80%',
//                     bgcolor: 'background.paper',
//                     boxShadow: 24,
//                     p: 4,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                 }}>
//                     {selectedImage && (
//                         <>
//                             <img src={selectedImage} alt="Selected" style={{ width: 'auto', maxHeight: '80vh', marginBottom: '16px' }} />
//                             <Box>
//                                 <IconButton sx={{ color: 'black' }}>
//                                     <DownloadIcon />
//                                 </IconButton>
//                                 <IconButton sx={{ color: 'black' }}>
//                                     <ShareIcon />
//                                 </IconButton>
//                             </Box>
//                         </>
//                     )}
//                 </Box>
//             </Modal>
//         </Box>
//     );
// }


// import { useEffect, useState } from 'react';
// import { Box, Breadcrumbs, IconButton, ImageList, ImageListItem, ImageListItemBar, Link, CircularProgress } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DownloadIcon from '@mui/icons-material/Download';
// import ShareIcon from '@mui/icons-material/Share';
// import FolderIcon from '@mui/icons-material/Folder';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5293'; // עדכן לכתובת המתאימה שלך

// export default function Gallery() {
//     interface File {
//         id: string;
//         name: string;
//         url: string;
//     }

   
//     interface Folder {
//         id: string;
//         name: string;
//     }
//     const [files, setFiles] = useState<File[]>([]);
//     const [folders, setFolders] = useState<Folder[]>([]);
//     const [breadcrumb, setBreadcrumb] = useState<{ id: string; name: string }[]>([]);
//     const [currentFolder, setCurrentFolder] = useState<string | null>(null); // הגדרת הסוג כ-string | null
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchData(currentFolder);
//     }, [currentFolder]);


//     useEffect(() => {
//       axios.get(`${API_BASE_URL}/folders`)
//           .then(response => console.log(response.data))
//           .catch(error => console.error(error));
//   }, []);

// const fetchData = async (folderId: string | null = '0') => {
//     setLoading(true);
//     try {
//         console.log('contents');
//         const url = folderId ? `${API_BASE_URL}/folders/${folderId}/contents` : `${API_BASE_URL}/folders/0/contents`;
//         const { data } = await axios.get(url);
        
//         setFolders(data.folders);
//         setFiles(data.files);
        
//         const breadcrumbRes = await axios.get(folderId ? `${API_BASE_URL}/folders/${folderId}/breadcrumb` : `${API_BASE_URL}/folders/0/breadcrumb`);
//         setBreadcrumb(breadcrumbRes.data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
//     setLoading(false);
// };

//     const navigateToFolder = (folderId: string | null) => {
//         setCurrentFolder(folderId);
//     };

//     return (
//         <Box sx={{ width: '100%', height: 450, overflowY: 'scroll', p: 2 }}>
//             {/* Breadcrumbs for navigation */}
//             <Breadcrumbs separator="/" aria-label="breadcrumb">
//                 {breadcrumb.map((folder, index) => (
//                     <Link
//                         key={folder.id}
//                         color={index === breadcrumb.length - 1 ? 'textPrimary' : 'inherit'}
//                         onClick={() => setCurrentFolder(folder.id)}
//                         sx={{ cursor: 'pointer' }}>
//                         {folder.name}
//                     </Link>
//                 ))}
//             </Breadcrumbs>
            
//             {loading ? <CircularProgress /> : (
//                 <ImageList variant="masonry" cols={3} gap={8}>
//                     {folders.map(folder => (
//                         <ImageListItem key={folder.id} onClick={() => navigateToFolder(folder.id)} style={{ cursor: 'pointer' }}>
//                             <FolderIcon sx={{ fontSize: 60, color: '#f1c40f' }} />
//                             <ImageListItemBar title={folder.name} />
//                         </ImageListItem>
//                     ))}
//                     {files.map(file => (
//                         <ImageListItem key={file.id}>
//                             <img
//                                 src={file.url}
//                                 alt={file.name}
//                                 loading="lazy"
//                                 style={{ cursor: 'pointer' }}
//                             />
//                             <ImageListItemBar
//                                 title={file.name}
//                                 actionIcon={
//                                     <Box>
//                                         <IconButton sx={{ color: 'white' }}>
//                                             <DownloadIcon />
//                                         </IconButton>
//                                         <IconButton sx={{ color: 'white' }}>
//                                             <ShareIcon />
//                                         </IconButton>
//                                         <IconButton sx={{ color: 'white' }}>
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </Box>
//                                 }
//                             />
//                         </ImageListItem>
//                     ))}
//                 </ImageList>
//             )}
//         </Box>
//     );
// }

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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import FolderIcon from '@mui/icons-material/Folder';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5293'; // עדכן לכתובת המתאימה שלך

export default function Gallery() {
    interface File {
        id: string;
        name: string;
        url: string;
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

    useEffect(() => {
        fetchData(currentFolder);
    }, [currentFolder]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/folders`)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        console.log('useEffect: Updated folders:', folders);
        console.log('useEffect: Updated files:', files);
    }, [folders, files]);

    // const fetchData = async (folderId: string | null = '0') => {
    //     setLoading(true);
    //     try {
    //         console.log('contents');
    //         const url = folderId
    //             ? `${API_BASE_URL}/folders/${folderId}/contents`
    //             : `${API_BASE_URL}/folders/0/contents`;
    //         const { data } = await axios.get(url);

    //         setFolders(data.folders);
    //         setFiles(data.files);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    //     setLoading(false);
    // };

    const fetchData = async (folderId: string | null = '0') => {
        setLoading(true);
        try {
            console.log('Fetching data for folder:', folderId);
            const url = folderId
                ? `${API_BASE_URL}/folders/${folderId}/contents`
                : `${API_BASE_URL}/folders/0/contents`;
                console.log('Fetching from URL:', url); // 🔹 בדיקה שהכתובת תקינה
            const { data } = await axios.get(url);
           
            console.log('from server: !!!Data received:', data);  // 🔹 בדיקה אם הנתונים באמת מגיעים
            setFolders(data.folders);
            setFiles(data.files);
            console.log('state: !!!!!!!Updated folders:', folders);  // 🔹 בדיקה אם folders מתעדכן
            console.log(' state: !!!!!!!Updated files:', files);  
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

            {/* Breadcrumbs */}
            <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
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
                    {folders.map((folder) => (
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
                        </ImageListItem>
                    ))}

                    {/* קבצים */}
                    {files.map((file) => (
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
                                src={file.url}
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

// import { useEffect, useState } from 'react';
// import {
//     Box,
//     Breadcrumbs,
//     IconButton,
//     ImageList,
//     ImageListItem,
//     ImageListItemBar,
//     Link,
//     CircularProgress,
//     Typography,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DownloadIcon from '@mui/icons-material/Download';
// import ShareIcon from '@mui/icons-material/Share';
// import FolderIcon from '@mui/icons-material/Folder';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5293';

// export default function Gallery() {
//     interface File {
//         id: string;
//         fileName: string;
//         fileType: string;
//         url?: string;
//     }

//     interface Folder {
//         id: string;
//         name: string;
//     }

//     const [files, setFiles] = useState<File[]>([]);
//     const [folders, setFolders] = useState<Folder[]>([]);
//     const [breadcrumb, setBreadcrumb] = useState<{ id: string; name: string }[]>([]);
//     const [currentFolder, setCurrentFolder] = useState<string | null>('0');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchData(currentFolder);
//     }, [currentFolder]);

//     useEffect(() => {
//         console.log('Updated folders:', folders);
//         console.log('Updated files:', files);
//     }, [folders, files]);
    
//     const fetchData = async (folderId: string | null = '0') => {
//         setLoading(true);
//         try {
//             console.log('Fetching data for folder:', folderId);
//             const url = `${API_BASE_URL}/folders/${folderId}/contents`;
//             console.log('Fetching from URL:', url);
//             const { data } = await axios.get(url);
//             console.log('Data received:', data);
    
//             // ✅ נשתמש בפונקציה עם prevState כדי לוודא עדכון נכון
//             setFolders(() => [...data.folders]);
//             setFiles(() => [...data.files]);
    
//             const breadcrumbRes = await axios.get(`${API_BASE_URL}/folders/${folderId}/breadcrumb`);
//             setBreadcrumb(() => breadcrumbRes.data);
    
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//         setLoading(false);
//     };
    
    

//     return (
//         <Box sx={{ padding: 4, backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
//             <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
//                 גלריה
//             </Typography>

//             <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
//                 {breadcrumb.map((folder, index) => (
//                     <Link
//                         key={folder.id}
//                         color={index === breadcrumb.length - 1 ? 'textPrimary' : 'inherit'}
//                         onClick={() => setCurrentFolder(folder.id)}
//                         sx={{ cursor: 'pointer', fontSize: '1rem' }}
//                     >
//                         {folder.name}
//                     </Link>
//                 ))}
//             </Breadcrumbs>

//             {loading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//                     <CircularProgress />
//                 </Box>
//             ) : (
//                 <ImageList variant="masonry" cols={3} gap={16}>
//                     {folders.map((folder) => (
//                         <ImageListItem
//                             key={folder.id}
//                             onClick={() => setCurrentFolder(folder.id)}
//                             sx={{
//                                 cursor: 'pointer',
//                                 backgroundColor: '#fff',
//                                 borderRadius: 2,
//                                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                                 padding: 2,
//                                 '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' },
//                             }}
//                         >
//                             <FolderIcon sx={{ fontSize: 60, color: '#f1c40f', marginBottom: 1 }} />
//                             <Typography variant="subtitle1" align="center">
//                                 {folder.name}
//                             </Typography>
//                         </ImageListItem>
//                     ))}

//                     {files.map((file) => (
//                         <ImageListItem
//                             key={file.id}
//                             sx={{
//                                 backgroundColor: '#fff',
//                                 borderRadius: 2,
//                                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                                 overflow: 'hidden',
//                                 '&:hover': { boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' },
//                             }}
//                         >
//                             <img
//                                 src={file.url || 'https://placehold.co/150'}
//                                 alt={file.fileName}
//                                 loading="lazy"
//                                 style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
//                             />
//                             <ImageListItemBar
//                                 title={file.fileName}
//                                 actionIcon={
//                                     <Box>
//                                         <IconButton sx={{ color: 'white' }}>
//                                             <DownloadIcon />
//                                         </IconButton>
//                                         <IconButton sx={{ color: 'white' }}>
//                                             <ShareIcon />
//                                         </IconButton>
//                                         <IconButton sx={{ color: 'white' }}>
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </Box>
//                                 }
//                             />
//                         </ImageListItem>
//                     ))}
//                 </ImageList>
//             )}
//         </Box>
//     );
// }
