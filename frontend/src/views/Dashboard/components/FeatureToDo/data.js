import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    name: 'Backend',
    desc: 'Store and serve data via APIs',
    estimatedTime: '20h',
    status: 'done'
  },
  {
    id: uuid(),
    name: 'Frontend - stock visualizer',
    estimatedTime: '30h',
    desc: 'Serve stock graph to users',
    status: 'done'
  },
  {
    id: uuid(),
    name: 'Frontend - add more pages',
    desc: 'About, statistics, documentation, request for new features',
    estimatedTime: '40h',
    status: 'todo'
  },
  {
    id: uuid(),
    name: 'Price prediction',
    desc: 'Jobs that predict stock prices and store in backend',
    estimatedTime: '50h',
    status: 'ongoing'
  },
  {
    id: uuid(),
    name: 'Related news',
    estimatedTime: '70h',
    desc: 'Mine the web for articles related to stock',
    status: 'todo'
  },
  {
    id: uuid(),
    name: 'Statistics',
    desc: 'Generate statistics for stocks and display in frontend',
    estimatedTime: '25h',
    status: 'ongoing'
  },


];