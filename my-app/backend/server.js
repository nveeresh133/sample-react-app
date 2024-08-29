const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/contact', (req, res) => {
  const contactDetails = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };
  res.json(contactDetails);
});

app.get('/api/company', (req, res) => {
  const companyDetails = {
    name: 'Tech Corp',
    address: '123 Tech Avenue',
    industry: 'Software Development',
  };
  res.json(companyDetails);
});

app.get('/api/project', (req, res) => {
  const projectDetails = {
    name: 'Alpha Project',
    deadline: '2024-12-31',
    status: 'In Progress',
  };
  res.json(projectDetails);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
