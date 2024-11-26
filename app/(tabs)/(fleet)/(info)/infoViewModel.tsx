export const clearSelection = ({
    setScanned,
    setInputRoute,
    setInputId,
    setInputDescription
} : any) => {
    setScanned(false);
    setInputRoute('');
    setInputId('');
    setInputDescription('');
}