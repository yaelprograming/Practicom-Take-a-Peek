// hooks/Download.js

// const downloadFile = (url: string, title: string) => {
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = title;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

// export default downloadFile;

// const AWS = require('aws-sdk');
// const fs = require('fs');
// const path = require('path');
// const JSZip = require('jszip');

// const s3 = new AWS.S3();

// const downloadFileFromS3 = async (bucketName, fileKey) => {
//     const params = {
//         Bucket: bucketName,
//         Key: fileKey,
//     };

//     try {
//         const data = await s3.getObject(params).promise();
//         // שמירת הקובץ במחשב
//         fs.writeFileSync(path.join(__dirname, fileKey), data.Body);
//         console.log(`File downloaded successfully: ${fileKey}`);
//     } catch (error) {
//         console.error('Error downloading file:', error);
//     }
// };

// const downloadFolderFromS3 = async (bucketName, folderKey) => {
//     const params = {
//         Bucket: bucketName,
//         Prefix: folderKey,
//     };

//     try {
//         const data = await s3.listObjectsV2(params).promise();
//         const zip = new JSZip();

//         for (const item of data.Contents) {
//             const fileData = await s3.getObject({ Bucket: bucketName, Key: item.Key }).promise();
//             zip.file(item.Key.replace(folderKey, ''), fileData.Body);
//         }

//         const content = await zip.generateAsync({ type: 'nodebuffer' });
//         fs.writeFileSync(path.join(__dirname, `${folderKey}.zip`), content);
//         console.log(`Folder downloaded and zipped successfully: ${folderKey}`);
//     } catch (error) {
//         console.error('Error downloading folder:', error);
//     }
// };

// export { downloadFileFromS3, downloadFolderFromS3 };
// דוגמה לשימוש
// downloadFileFromS3('your-bucket-name', 'path/to/your/file.txt');
// downloadFolderFromS3('your-bucket-name', 'path/to/your/folder/');
