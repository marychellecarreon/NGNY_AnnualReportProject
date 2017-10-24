# ISSUES

### Content section title not updating when updated in menu-section

CONTEXT - `Menu` is a parent component to `EditPart` and `NewPart` while `EditPart` is a parent to `EditSection` and `NewSection`. `NewSection` creates a new Section with a user generated titled under Part and `NewPart` creates a new Part with a user generated title. The title for the part and section appears in the `Content` component from the title entered by the user. The user can edit the title of both Part and Section.

PROBLEM - When the user edits either Part or Section title the title inside `Menu` component updates straight away. However, the title in `Content` doesn't update at the same time.

DETAILS - `Placeholder` contains the state that changes the Part and Section title for `Content`. This doesn't change when the user edits the title in `EditSection` or `EditPart`. However, when the user clicks on the title of either the Part or the Section it will update the both the Part and Section title. This seems to update the state in `Placeholder`
## DEVISE

This is what's in the devise model.

```
User(id: integer, email: string, encrypted_password: string, reset_password_token: string, reset_password_sent_at: datetime, remember_created_at: datetime, sign_in_count: integer, current_sign_in_at: datetime, last_sign_in_at: datetime, current_sign_in_ip: inet, last_sign_in_ip: inet, created_at: datetime, updated_at: datetime)
```


### EXCESS CODE FROM REPORTINDEX

```
<p>{this.state.report.header_colour}</p>

<h3>
  Hello, {this.state.name}!
</h3>
<div>
  <h2>Please Enter a Colour</h2>
  <form ref={(input) => this.resetForm = input} onSubmit={(e) => this.updateObject(e)}>
     <input ref={(input) => this.backgroundcolor = input} type="text" placeholder="Enter Colour" />
     <button type="submit">+ Add Item</button>
 </form>
</div>

<form >
  <label htmlFor="name">
    Say hello to:
  </label>
  <input
    id="name"
    type="text"
    value={this.state.name}
    onChange={(e) => this.updateName(e.target.value)}
  />
</form>
```
