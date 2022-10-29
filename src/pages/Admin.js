import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    "name": 'tshirt',
    "s": 50,
    "m": 100,
    "l": 10,
  },
  {
    "name": 'jacket',
    "s": 100,
    "m": 10,
    "l": 20,
  },
  {
    "name": 'hoodie',
    "s": 10,
    "m": 30,
    "l": 20,
  },
  {
    "name": 'shirt',
    "s": 17,
    "m": 193,
    "l": 112,
  },
];

const jeanData = [  {
  "name": 'jean',
  "30": 100,
  "32": 50,
  "34": 20,
},
]

export default class Admin extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/tiny-bar-chart-35meb';

  render() {
    return (
      <div className='question'>
        <div className='question-container'>
        <h1>charts</h1>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="s" fill="#8884d8" />
          <Bar dataKey="m" fill="#82ca9d" />
          <Bar dataKey="l" fill="#34eb89" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={jeanData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="30" fill="#8884d8" />
          <Bar dataKey="32" fill="#82ca9d" />
          <Bar dataKey="34" fill="#34eb89" />
        </BarChart>
      </ResponsiveContainer>
      </div>
      </div>
    );
  }
}
