import React, { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MyForm from "../components/MyForm"
import { FormspreeProvider, useForm, ValidationError } from "@formspree/react"

function Contact() {
  const [status, setStatus] = useState("")
  const [state, useFormSubmit] = useForm("contactForm")
  state.submitted = false
  return (
    <Layout>
      <SEO title="Contact" />
      <MyForm />
      {/* <div
        id="submitThanks"
        style={{ visibility: state.submitted ? "visible" : "hidden" }}
      >
        Thank you
      </div>
      <form
        onSubmit={handleSubmit}
        action="https://formspree.io/p/1625993179712978125/f/contactForm"
        method="POST"
      >
        {console.log(state.errors)}
        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" name="_replyto " required />
        {/* <ValidationError prefix="Email" field="email" errors={state.errors} /> */}
        {/* <textarea id="message" name="message" /> */}
        {/* <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          /> 
        <button type="submit" disabled={state.submitting}>
          Submit
        </button>
      </form> */}
    </Layout>
  )

  function handleSubmit() {
    state.submitted = true
  }
}
export default Contact
