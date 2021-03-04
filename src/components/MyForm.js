// Customize this 'myform.js' script and add it to your JS bundle.
// Then import it with 'import MyForm from "./myform.js"'.
// Finally, add a <MyForm/> element whereever you wish to display the form.

import React from "react"
import "../styles/MyForm.css"

export default class MyForm extends React.Component {
  constructor(props) {
    super(props)
    this.submitForm = this.submitForm.bind(this)
    this.state = {
      status: "",
    }
  }

  render() {
    const { status } = this.state
    return (
      <div
        id="form-wrapper"
        style={{ width: "800px", margin: "auto", padding: "3em 0" }}
      >
        <form
          onSubmit={this.submitForm}
          action="https://formspree.io/p/1625993179712978125/f/contactForm"
          method="POST"
          style={{ display: status==="SUCCESS" ? "none" : "block" }}
        >
          <div style={{margin: "1em 2em", fontSize: ".9em"}}>Send me a message and I will get back to you as soon as possible</div>
          <div className="form-small-elements">
            <div className="form-small">
              <label>Name</label>
              <input type="text" name="name" className="form-input" required />
            </div>
            <div className="form-small">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="form-large">
            <label>Message</label>
            <textarea
              name="message"
              className="form-input"
              style={{ resize: "block" }}
            />
          </div>
          <button className="form-submit">Submit</button>
        </form>
        <div
          style={{
            display: status !== "SUCCESS" ? "none" : "block",
            textAlign: "center",
            fontSize: "1.5em"
          }}
        >
          Thank you for reaching out!
        </div>
      </div>
    )
  }

  submitForm(ev) {
    ev.preventDefault()
    const form = ev.target
    const data = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, form.action)
    xhr.setRequestHeader("Accept", "application/json")
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        form.reset()
        this.setState({ status: "SUCCESS" })
        // window.alert("Thank you for reaching out")
      } else {
        this.setState({ status: "ERROR" })
        window.alert("There was an error sending your message")
      }
    }
    xhr.send(data)
  }
}
