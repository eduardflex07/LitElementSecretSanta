import { LitElement, html, css } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-list/mwc-check-list-item.js';
import '@material/mwc-list/mwc-list.js';
import '@material/mwc-checkbox';
import '@material/mwc-textfield';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-icon';

class TodoListElement extends LitElement {

    static get styles() {
        return css `
          .container {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            width: 50vw;
            max-width: 70vw;
          }
        `;
    }

    static get properties() {
        return {
            noTodoData: {
                type: Boolean,
            },
            todo: {
                type: String,
            },
            todos: {
                type: Array,
            },
            present: {
                type: String,
            },
            presents: {
                type: Array,
            }
        };
    }

    constructor() {
        super();
        this.todo = '';
        this.todos = [];
        this.present = '';
        this.presents = [];
        this.noTodoData = true;
    }

    addTodo() {
        const todo = this.shadowRoot.querySelector('#current-todo');
        this.todos = [...this.todos, todo.value];
        // Esta función se ejecuta si el spread opereator no es suficiente
        // como para que el cambio se refleje de forma atomática
        // this.requestUpdate()
        todo.value = '';
    }

    addPresent() {
        const present = this.shadowRoot.querySelector('#current-present');
        this.presents = [...this.presents, present.value];
        present.value = '';

    }

    deleteTodo(e) {
        this.presents = this.presents.filter((present) => present !== e.target.id);
    }

    render() {
            return html `
          <div class="container">
            <mwc-textfield
              label="Participante"
              helper="Escribe aquí"
              @change="${(e) => (this.todo = e.target.value)}"
              .value="${this.todo}"
              id="current-todo"
            ></mwc-textfield>
            <mwc-button
              raised
              @click="${this.addTodo}"
              label="Agregar"
              ?disabled="${this.todo === ''}"
            ></mwc-button>
    
            ${this.todos.length === 0
              ? html` <p>No hay participantes para este secret santa aún</p> `
              : html`
                  <mwc-list multi>
                    ${this.todos.map(
                      (todo) => html`
                      <mwc-list-item graphic="icon">
                        <slot>${todo}</slot>
                          <mwc-icon
                          slot="graphic">
                          delete_forever
                          </mwc-icon>
                        <mwc-textfield
                          label="Regalo"
                          helper="Escribe aquí tu regalo"
                          @change="${(e) => (this.presents = e.target.value)}"
                          .value="${this.present}"
                          id="current-present"
                        ></mwc-textfield>
                        <mwc-button
                          raised
                          @click="${this.addPresent}"
                          label="Agregar2"
                          ?disabled="${this.presents === ''}"
                        ></mwc-button>
                      </mwc-list-item>
                        <li divider role="separator"></li>
                      `
                    )}
                  </mwc-list>
                `}
          </div>
        `;
      }
}

customElements.define('todo-list-element', TodoListElement);