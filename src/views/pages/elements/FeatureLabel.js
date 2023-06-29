import {
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@mui/material"
import { blue } from '@mui/material/colors';

const FeatureLabel = ({ labelName }) => {
  return (
    <FormGroup 
        sx={{
            background: "#55BDB3",
            color: 'white',
            display: 'flex',
            paddingX: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2
        }}
        >
            <FormControlLabel 
            control={
            <Checkbox 
            defaultChecked 
            sx={{
                color: blue[50],
                '&.Mui-checked': {
                color: blue[50],
                },
            }}
            />
            } 
            label={labelName} 
            />
    </FormGroup>
  )
}

export default FeatureLabel