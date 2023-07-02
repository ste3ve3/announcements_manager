import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import DataWidget from 'components/Global/DataWidget';
import Scrollbar from 'components/Global/scrollbar/Scrollbar';
import { useFetcher } from 'api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Label from 'components/label/Label';
import moment from 'moment';
const MONTHS = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};
function years() {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 2023; year <= currentYear; year++) {
    years.push(year);
  }

  return years;
}
// ----------------------------------------------------------------------

const headLabel = [
    'No',
    'Car Name',
    'Car Owner',
    'Car Brand',
    'Car Year',
    'Status',
    'Date',
  ];

const CarsReport = () => {
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    isYearly: false,
  });
  const { data, isError, isLoading } = useFetcher(
    `/registercar?cleared=true&perPage=1000000&date=${JSON.stringify(date)}`
  );

  const cars = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  const exportPDF = () => {
    const unit = 'mm';
    const size = 'A4';
    const orientation = 'portrait';

    const marginLeft = 10;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);

    const data = cars.map(
      (
        {
          carName,
          ownedBy,
          brand,
          year,
          isCleared,
          createdAt,
        },
        index,
      ) => {
        const carOwner = ownedBy?.names;

        return [
          index + 1,
          carName,
          carOwner,
          brand,
          year,
          isCleared
            ? 'Cleared'
            : 'Not Cleared',
          createdAt,
        ];
      },
    );

    let content = {
      startY: 20,
      headStyles: {
        fillColor: '#008D41',
      },
      head: [
        [
          'No',
          'Car Name',
          'Car Owner',
          'Car Brand',
          'Car Year',
          'Status',
          'Date',
        ],
      ],
      body: data,
      willDrawCell: function (data) {
        var doc = data.doc;
        var rows = data.table.body;
        if (rows.length === 1) {
        } else if (data.row.index === rows.length - 1) {
          // doc.setFontStyle('bold');
          doc.setFontSize('10');
          doc.setFillColor(255, 255, 255);
        }
      },
    };

    doc.text(
      `MAGERWA VCC CLEARED CARS FOR ${
        date.isYearly ? 'YEAR' : MONTHS[date.month].toUpperCase()
      } ${date.year}`,
      marginLeft + 4,
      15,
    );

    doc.autoTable(content);

    const pageCount = doc.internal.getNumberOfPages();
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        'Page ' + String(i) + ' of ' + String(pageCount),
        210 - 20,
        297 - 10,
        null,
        null,
        'right',
      );
    }
    doc.save(
      `Cleared Cars - ${
        date.isYearly ? '' : MONTHS[date.month]
      } ${date.year}.pdf`,
    );
  };

  return (
    <>

      <Container>
        <Stack
          direction="row"
          spacing={1}
          flexShrink={0}
          // sx={{ my: 0 }}
          justifyContent="space-between"
        >
          <Typography variant="h4">Cleared Cars Report</Typography>
        </Stack>
        <Stack justifyContent="end" direction={'row'} sx={{ my: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              labelId="select"
              id="select"
              value={date.month}
              onChange={e =>
                setDate(prev => ({
                  ...prev,
                  month: e.target.value,
                }))
              }
              label="Select "
              disabled={date.isYearly}
              required
              input={<OutlinedInput />}
            >
              {Object.keys(MONTHS).map((i, index) => {
                return (
                  <MenuItem value={i} key={index}>
                    {MONTHS[i]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120, mx: 2 }}>
            <Select
              labelId="select"
              id="select"
              value={date.year}
              onChange={e =>
                setDate(prev => ({
                  ...prev,
                  year: e.target.value,
                }))
              }
              label="Select "
              required
              input={<OutlinedInput />}
            >
              {years().map((year, index) => {
                return (
                  <MenuItem value={year} key={index}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              labelId="select"
              id="select"
              value={date.isYearly}
              onChange={e =>
                setDate(prev => ({
                  ...prev,
                  isYearly: e.target.value,
                }))
              }
              label="Select "
              required
              input={<OutlinedInput />}
            >
              {[0, 1].map((label, index) => {
                return (
                  <MenuItem value={label === 0} key={index}>
                    {label === 0 ? 'Annually' : 'Monthly'}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            variant="contained"
            color='secondary'
            sx={{ m: 2, mt: 0 }}
            onClick={() => exportPDF()}
            disabled={!cars.length}
          >
            Download PDF Report
          </Button>
        </Stack>
        <DataWidget
          title={'Cars'}
          isLoading={isLoading && !cars.length && !isError}
          isError={
            !isLoading && !cars.length && isError ? isError : null
          }
          isEmpty={!isLoading && !cars.length && !isError}
          customEmptyMessage={`There are no cars available in this ${
            date.isYearly
              ? 'year, ' + date.year
              : 'month. ' + MONTHS[date.month] + ', ' + date.year
          }`}
        >
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {headLabel.map((headCell, index) => (
                        <TableCell
                          key={index}
                          align={'left'}
                          sortDirection={false}
                        >
                          {headCell}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cars.map((row, index) => {
                      const {
                        id,
                        carName,
                        ownedBy,
                        brand,
                        year,
                        isCleared,
                        createdAt,
                      } = row;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {index + 1}
                            </Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {carName}
                            </Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {ownedBy?.names}
                            </Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {brand}
                            </Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {year}
                            </Typography>
                          </TableCell>

                          <TableCell align="left">
                            <Label
                              color={
                                isCleared
                                  ? 'success'
                                  : 'error'
                              }
                            >
                              { isCleared ? "Cleared" : "Not Cleared" }
                            </Label>
                          </TableCell>

                          <TableCell align="left">
                            {createdAt}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
        </DataWidget>
      </Container>
    </>
  );
};
export default CarsReport;