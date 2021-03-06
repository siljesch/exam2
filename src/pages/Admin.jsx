import React, { useContext, useEffect, useState } from 'react'
import AdminEnquiries from '../components/admin/AdminEnquiries'
import AdminContact from '../components/admin/AdminContact'
import { Heading } from '../components/styles/StyledHeadings'
import AuthContext from '../context/AuthContext';
import useAxios from '../hooks/useAxios';
import { ENQUIRY_PATH } from '../utils/api';
import { Link } from 'react-router-dom';

function Admin() {
  const [auth] = useContext(AuthContext);
  const [error, setError] = useState();

  const http = useAxios();

  // Fetching data as authorized user with useAxios.
  // The eslint rule inside removes warnings about missing dependencies, from using http
  // inside the function but not including it in the dependencies.
  useEffect(() => {
    const fetchData = async () => {
      const response = await http.get(ENQUIRY_PATH);
      console.log(response)
    };
    fetchData().catch((error) => setError(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (error) {
    return (
      <div className='content error'>
        <Heading as={"h2"}>Something went wrong</Heading>
        <p>{error.message}</p>
        <p>Please log in to view this page or head back to homepage</p>
        <div className='error__btn'>
        <Link className="error__btn--login" to="/login">
          Login
        </Link>/
        <Link className='error__btn--home' to="/">
        Home
        </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='content'>
    <Heading>Inbox</Heading>
    <section className='adminCont'>
      <AdminEnquiries />
      <AdminContact />
    </section>
    </div>
  )
}

export default Admin