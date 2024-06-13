import {  useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import uniqid from 'uniqid';
import { FaDownload } from "react-icons/fa6";
import jsPDF from 'jspdf';
import * as Yup from "yup";
import './home.css' 


function Home() {

  // Retrieve data from localStorage
  const initialData = JSON.parse(localStorage.getItem('formData')) || [];
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Save data to localStorage 
    localStorage.setItem('formData', JSON.stringify(data));
  }, [data]);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone_number: "",
      email: "",
      address: "",
      id: uniqid(1)
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      email: Yup.string()
        .matches(
          /(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/,
          "Enter a valid email"
        )
        .required("Required"),
      phone_number: Yup.string()
      .required("Required"),
    
      address: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (values) {
        setData((prevData) => [...prevData, values]); // setting new data to state
        formik.resetForm()
      } else {
        toast.error('Value should be defined');
      }
    }
  });

// pdf code
  const handleDownload = (row) => {
    const doc = new jsPDF();
    doc.text(`Name: ${row.name}`, 10, 10);
    doc.text(`Phone Number: ${row.phone_number}`, 10, 40);
    doc.text(`Email: ${row.email}`, 10,30);
    doc.text(`Address: ${row.address}`, 10, 20);
    doc.save(`${row.name}.pdf`);
  };
  // console.log(formik.values,"formik");
  // console.log(data ,'ok');
  return (
    <section className='main'>



 <Container>
<Row>
<Col lg={12} md={12} sm={12}>
  <div className='main1'>
    <div className='sub-main'>
  
<h1 className='mt-4 mb-3'>Form</h1>
 <div className='contact-form'>
      <Form onSubmit={formik.handleSubmit}>  
  <Row>
  <Col lg={6} md={12} sm={12}>
  <Form.Label  className=' ms-4'> what is your name ?*</Form.Label>
                        <Form.Group className="mb-3 ms-4 w-50" controlId="formBasicEmail">
                          <Form.Control
                            type="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            isValid={formik.touched.name && !formik.errors.name}
                            isInvalid={
                              formik.touched.name && !!formik.errors.name
                            }
                            placeholder="Enter Your Name"
                            autoFocus
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                          </Form.Control.Feedback>
                        </Form.Group> 
  
  </Col>
  




<Col lg={6} md={12} sm={12}>
<Form.Label  className=' ms-4'>  How shall we conatact you ?*</Form.Label>
                        <Form.Group className=" ms-4 w-50" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            name="phone_number"
                            value={formik.values.phone_number}
                            onChange={formik.handleChange}
                            isValid={formik.touched.phone_number && !formik.errors.phone_number}
                            isInvalid={
                              formik.touched.phone_number && !!formik.errors.phone_number
                            }
                            placeholder="Enter Your Phone Number"
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                          </Form.Control.Feedback> 
                        </Form.Group>

                        
                  

</Col>

<Col lg={6} md={12} sm={12}>
<Form.Label className='mt-3 ms-4'> email </Form.Label>
<Form.Group className=" mb-3   ms-4 w-50to-bottom" controlId="formBasicEmail">
                          <Form.Control
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            isValid={formik.touched.email && !formik.errors.email}
                            isInvalid={
                              formik.touched.email && !!formik.errors.email
                            }
                            placeholder="Enter Your Email"
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                          </Form.Control.Feedback> 
                        </Form.Group>
                       

                        
                  

</Col>


<Col lg={12} md={12} sm={12}>
<Form.Label className=' ms-4'> Address</Form.Label>
                      <Form.Group
                        className="mb-3  ms-4 w-50 teaxtareachanges "
                        controlId="exampleForm.ControlTextarea1"
                      >
                       
<Form.Control
                          as="textarea"
                          rows={5}
                          name="address"
                          value={formik.values?.address}
                          onChange={formik.handleChange}
                          isValid={
                            formik.touched.address && !formik.errors.address
                          }
                          isInvalid={
                            formik.touched.address && !!formik.errors.address
                          }
                          maxLength={500}
                          placeholder="Address"
                        />
                        {formik.values.address &&
                          !formik.errors.address && ( // Conditionally render the character count
                            <div className="max-char">
                              {formik.values.address.length + "/500"}
                            </div>
                          )}
                        {formik.errors.address && ( // Render error message if validation fails
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.address}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>

</Col>
  </Row>



  <Button className='submit-button  d-flex justify-content-center mt-4 mb-4 ms-4 w-50' type='sumbit' >Sumbit</Button>

  </Form>
 </div>

    </div>
  </div>
  
</Col>

<div className='mt-4'>
  
  <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Name</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right"> Email</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right"> download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.phone_number}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">  <Button onClick={() => handleDownload(row)}>
                          <FaDownload />
                        </Button></TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
</div>

</Row>

</Container>

    </section>
  )
}

export default Home