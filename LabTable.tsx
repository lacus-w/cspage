import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './styles.css';

interface Column {
  id: 'lab_name' | 'lab_date' | 'lab_score';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'lab_name', label: '项目名称', minWidth: 170 },
  { id: 'lab_date', label: '开始日期', minWidth: 100 },
  {
    id: 'lab_score',
    label: '得分',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  lab_id: string;
  lab_name: string;
  lab_date: string;
  lab_score: number;
}

// function createData(
//   lab_id: string,
//   lab_name: string,
//   lab_date: string,
//   lab_score: number
// ): Data {
//   return { lab_id, lab_name, lab_date, lab_score };
// }

// const rows = [
//   createData('a01', 'UDF定义', '2022-2-2', -1),
//   createData('a02', 'JDBC连接', '2022-3-3', -1),
//   createData('a03', 'MySQL数据导出', '2024-5-5', -1),
//   createData('a04', '数据查询和存储', '2024-6-6', -1),
// ];

const json_data = `[  
  {"lab_id": "a01", "lab_name": "UDF定义", "lab_date": "2022-2-2", "lab_score": -1},  
  {"lab_id": "a02", "lab_name": "JDBC连接", "lab_date": "2022-3-3", "lab_score": -1},  
  {"lab_id": "a03", "lab_name": "MySQL数据导出", "lab_date": "2024-5-5", "lab_score": -1},  
  {"lab_id": "a04", "lab_name": "数据查询和存储", "lab_date": "2024-6-6", "lab_score": -1},  
  {"lab_id": "a05", "lab_name": "数据清洗与预处理", "lab_date": "2023-1-1", "lab_score": 85},  
  {"lab_id": "a06", "lab_name": "SQL查询优化", "lab_date": "2023-2-15", "lab_score": 92},  
  {"lab_id": "a07", "lab_name": "NoSQL数据库入门", "lab_date": "2023-3-10", "lab_score": 78},  
  {"lab_id": "a08", "lab_name": "大数据可视化", "lab_date": "2023-4-20", "lab_score": 88},  
  {"lab_id": "a09", "lab_name": "机器学习基础", "lab_date": "2023-5-5", "lab_score": 72},  
  {"lab_id": "a10", "lab_name": "深度学习模型训练", "lab_date": "2023-6-10", "lab_score": 80},  
  {"lab_id": "a11", "lab_name": "自然语言处理", "lab_date": "2023-7-15", "lab_score": 85},  
  {"lab_id": "a12", "lab_name": "时间序列分析", "lab_date": "2023-8-20", "lab_score": 90},  
  {"lab_id": "a13", "lab_name": "数据挖掘与关联规则学习", "lab_date": "2023-9-10", "lab_score": 82},  
  {"lab_id": "a14", "lab_name": "推荐系统构建", "lab_date": "2023-10-15", "lab_score": 75},  
  {"lab_id": "a15", "lab_name": "图算法与社交网络分析", "lab_date": "2023-11-5", "lab_score": 88},  
  {"lab_id": "a16", "lab_name": "数据仓库与Hive实践", "lab_date": "2023-12-10", "lab_score": 95},  
  {"lab_id": "a17", "lab_name": "Spark大数据分析", "lab_date": "2024-1-15", "lab_score": 87},  
  {"lab_id": "a18", "lab_name": "Kafka消息队列处理", "lab_date": "2024-2-20", "lab_score": 79},  
  {"lab_id": "a19", "lab_name": "实时数据流处理", "lab_date": "2024-6-12", "lab_score": 83},  
  {"lab_id": "a20", "lab_name": "Redis数据库", "lab_date": "2024-6-13", "lab_score": 90}  
]`;

const parsedData = JSON.parse(json_data) as Data[];
parsedData.sort((a, b) => {
  const dateA = new Date(a.lab_date);
  const dateB = new Date(b.lab_date);

  if (
    isNaN(dateA.getTime()) ||
    isNaN(dateB.getTime()) ||
    dateA.getTime() === dateB.getTime()
  ) {
    return 0;
  }

  // descend order:
  return dateB.getTime() - dateA.getTime();
});

const rows = parsedData;

function createScoreLink(score: number): string {
  return `https://example.com/scores/${score}`;
}

function renderCell(value: any, column: Column) {
  if (column.id === 'lab_score' && typeof value === 'number') {
    return (
      <a
        className="score-link"
        href={createScoreLink(value)}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'tomato', // 链接颜色
          textDecoration: 'none', // 去除下划线
          transition: 'color 0.3s ease', // 过渡效果
        }}
      >
        {value <= 0 ? '开始评分' : value.toFixed(2)}
      </a>
    );
  }
  return column.format ? column.format(value) : value;
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.lab_id}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {renderCell(row[column.id], column)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
