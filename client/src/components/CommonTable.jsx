import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const CommonTable = ({
  title,
  columns,
  rows,
  page,
  limit,
  total,
  HeaderActions,
  onPageChange,
  onLimitChange,
  onClickRow,
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.RootCommonTable}>
      {!!title && <Box className={clsx(classes.title, 'medium-xl-txt ')}>{title}</Box>}
      {!!HeaderActions && HeaderActions}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.id}>{col.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!!rows.length ? (
            <TableBody>
              {rows.map(rowData => (
                <TableRow
                  className={rowData.useClickRow ? classes.useRowClickDetail : ''}
                  key={rowData.id}
                  onClick={() => onClickRow(rowData)}
                >
                  {columns.map(col => (
                    <TableCell key={col.id}>{rowData[col.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={100}>
                  <Box className={classes.noData}>No Data.</Box>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {(!!page || !!total || !!limit || !!onPageChange || !!onLimitChange) && (
        <TablePagination
          className={classes.pagination}
          component="div"
          rowsPerPageOptions={[10, 25, 50, 100, 200]}
          page={page - 1}
          count={total}
          rowsPerPage={limit}
          onPageChange={(_, newPage) => onPageChange(newPage + 1)}
          onRowsPerPageChange={e => onLimitChange(e.target.value)}
        />
      )}
    </Paper>
  )
}

CommonTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  rows: PropTypes.array,
  page: PropTypes.number,
  limit: PropTypes.number,
  total: PropTypes.number,
  HeaderActions: PropTypes.element,
  onPageChange: PropTypes.func,
  onLimitChange: PropTypes.func,
  onClickRow: PropTypes.func,
}

const useStyles = makeStyles(theme => ({
  RootCommonTable: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  pagination: {
    marginBottom: theme.spacing(-2),
  },
  noData: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    fontSize: 18,
  },
  useRowClickDetail: {
    cursor: 'pointer',
    '&:hover': {
      background: '#dcdcdc',
    },
  },
}))

export default CommonTable
