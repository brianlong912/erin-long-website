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
        style={{ maxWidth: "800px", margin: "3rem auto" }}
      >
        <form
          onSubmit={this.submitForm}
          action="https://formspree.io/p/1625993179712978125/f/contactForm"
          method="POST"
          style={{ display: status === "SUCCESS" ? "none" : "block" }}
        >
          <div style={{ margin: "1em 2em", fontSize: ".9em" }}>
            Send me a message and I will get back to you as soon as possible
          </div>
          {/* Name and email elements for form */}
          <div className="form-small-elements">
            <div className="form-small">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="form-input" required />
            </div>
            <div className="form-small">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Message box of form */}
          <div className="form-large">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              className="form-input"
              style={{ resize: "block" }}
            />
          </div>
          <button className="form-submit">Submit</button>
        </form>

        {/* Display message that replaces form on successful submit */}
        <div
          style={{
            display: status !== "SUCCESS" ? "none" : "block",
            textAlign: "center",
            fontSize: "1.5em",
          }}
        >
          Thank you for reaching out!
        </div>
      </div>
    )
  }

  /* Create http request to formspree to then be emailed  */
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
