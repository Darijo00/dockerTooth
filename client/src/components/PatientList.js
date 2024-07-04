import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Avatar from '@mui/material/Avatar';
import av1 from '../assets/images/avatars/1.jpg';
import editIcon from '../assets/images/edit.png';
import deleteIcon from '../assets/images/delete.png';
import searchIcon from '../assets/images/search.png';
import { InputGroup, FormControl } from 'react-bootstrap';


function createData(id, referralcode, avatar, name, email, gender, city, status) {
  return {
    id,
    referralcode,
    avatar,
    name,
    email,
    gender,
    city,
    status,
  };
}

const getStatusStyle = (status) => {
  if (status === "Active") {
    return { 
      color: '#14522D', 
      backgroundColor: '#8AF3B4', 
      borderRadius: '21px', 
      padding: '11px 8px', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold'
    };
  } else if (status === "Suspended") {
    return { 
      color: '#AF5934', 
      backgroundColor: '#FFC7C7', 
      borderRadius: '21px', 
      padding: '11px 8px', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold'
    };
  }
  return {};
};
const rows = [
  createData(1, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Male", "New York", "Active"),
  createData(2, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Female", "New York", "Active"),
  createData(3, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Male", "New York", "Active"),
  createData(4, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Female", "New York", "Active"),
  createData(5, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Male", "New York", "Suspended"),
  createData(6, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Female", "New York", "Active"),
  createData(7, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Male", "New York", "Active"),
  createData(8, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Male", "New York", "Suspended"),
  createData(9, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Male", "New York", "Active"),
  createData(10, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Female", "New York", "Suspended"),
  createData(11, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Male", "New York", "Active"),
  createData(12, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Male", "New York", "Suspended"),
  createData(13, '#3453423', av1, "Jim Hortons", "jim.horons@gmail.com", "Female", "New York", "Active"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'referralcode',
    numeric: false,
    disablePadding: true,
    label: 'Referral Code',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Patient Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'city',
    numeric: false,
    disablePadding: false,
    label: 'City',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className = "fw-bold"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
            <InputGroup className="mb-3 w-100">
              <InputGroup.Text id="basic-addon1">
                <img src={searchIcon} alt="Search" style={{ width: '16px', height: '16px' }} />
              </InputGroup.Text>
              <FormControl
                type="text"
                id="myInput"
                placeholder="Search Patient"
                title="Type in a name"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [dense, setDense] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNextPage = () => {
    if (page + 1 < Math.ceil(rows.length / rowsPerPage)) {
      setPage(page + 1);
    }
    console.log('page after click next:', page)
    console.log('max', Math.ceil(rows.length / rowsPerPage))
  };

  const handlePrevPage = () => {
    if (page >= 0) {
      setPage(page - 1);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%', paddingLeft: '19px' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.referralcode}
                    </TableCell>
                    <TableCell className="d-flex align-items-center">
                      <Avatar src={av1} />
                      <Typography align="left" variant="body1" component="span" style={{ marginLeft: 8 }}>
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.gender}</TableCell>
                    <TableCell align="left">{row.city}</TableCell>
                    <TableCell align="left">
                      <div style={getStatusStyle(row.status)}>
                        {row.status}
                      </div>
                    </TableCell>
                    <TableCell align="left">
                    <IconButton aria-label="edit" onClick={() => console.log('current page value', page)}>
                      <img src={editIcon} alt="edit" style={{ width: '24px', height: '24px' }} />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => console.log('Delete', row.id)}>
                      <img src={deleteIcon} alt="delete" style={{ width: '24px', height: '24px' }} />
                    </IconButton>
                  </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="body2">
            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, rows.length)} of {rows.length} entries
          </Typography>
          <Box>
            <Button
              onClick={handlePrevPage}
              disabled={page <= 0}
              sx={{
                textTransform: 'none',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'lightgrey',
                },
              }}
            >
              Prev
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={page + 1 >= Math.ceil(rows.length / rowsPerPage)}
              sx={{
                textTransform: 'none',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'lightgrey',
                },
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
