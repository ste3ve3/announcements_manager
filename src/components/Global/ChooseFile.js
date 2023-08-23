import { Button, ButtonBase, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { IconCameraPlus } from '@tabler/icons';

const ChooseFile = ({ title, onSelect, selected, error, fullWidth = true }) => {
    const handleClickUpload = (e) => {
        const input = document.getElementById('choose-file-upload');
        input?.click();
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length === 0) return;

        const selectedFile = files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            // Base 64 or any other handling you need for the selected file
            onSelect(reader.result);
        };

        reader.readAsDataURL(selectedFile); // You can replace this with other methods depending on the file type

    };

    return (
        <Stack sx={{ my: 1 }} alignItems="start" spacing={2}>
            <Typography>{title}</Typography>

            {selected && (
                // Render the selected file, you might need different handling based on the file type
                <div>
                    Selected File: {selected.name}
                </div>
            )}
            {error && (
                <Typography variant="caption" color="error">
                    {error}
                </Typography>
            )}
            {!selected && (
                <ButtonBase
                    onClick={handleClickUpload}
                    sx={{
                        width: {
                            xs: '100%',
                            sm: fullWidth ? '100%' : '50%',
                            lg: fullWidth ? '100%' : '30%'
                        }
                    }}
                >
                    <Stack
                        sx={{ height: 200, width: '100%', borderRadius: 3, border: 1 }}
                        justifyContent="center"
                        alignItems={'center'}
                        spacing={0.5}
                    >
                        <IconCameraPlus size={30} />
                        <Typography>Click to select a file</Typography>
                    </Stack>
                </ButtonBase>
            )}
            <input type="file" id="choose-file-upload" hidden onChange={handleFileChange} />
            {selected && (
                <Button variant="outlined" color="secondary" component="label" onClick={handleClickUpload}>
                    Change File
                </Button>
            )}
        </Stack>
    );
};

export default ChooseFile;
