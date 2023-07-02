import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import {
  Link,
  Card,
  Grid,
  Typography,
  CardContent,
  Box,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledcarName = styled(Link)({
  width: '100%',
  height: 44,
  overflow: 'hidden',
  fontSize: "18px",
  fontWeight: "bold",
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

ClearedCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function ClearedCard({ car }) {
  const {
    _id: id,
    carImage,
    carName,
    ownedBy,
  } = car;

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
        <CardContent
          sx={{
            position: 'relative',
            p: 0,
          }}
        >
          
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 48, color: '#90EE90' }} />
          </div>
          <StyledCardMedia>
            <StyledCover alt={carName} src={carImage} />
          </StyledCardMedia>
            <Box 
            sx={{
              px: 3,
              pt: 2
            }}
            >
              <StyledcarName
                color="inherit"
                variant="subcarName1"
                underline="none"
              >
                {carName}
              </StyledcarName>
              <Typography
              gutterBottom
              variant="caption"
              fontSize="small"
              fontWeight="bold"
              sx={{ color: 'text.disabled', display: 'block' }}
              >
                Owned by _ {ownedBy?.names}
              </Typography>
            </Box>
        </CardContent>
        </Card>
      </Grid>
    </>
  );
}