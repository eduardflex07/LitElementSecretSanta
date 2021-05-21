import { LitElement, html, css } from 'lit-element';
import '@material/mwc-button';
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
                type: Map,
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
        this.todos = new Map();
        this.present = '';
        this.presents = [];
        this.noTodoData = true;
    }

    addTodo() {
        const todo = this.shadowRoot.querySelector('#current-todo');
        this.todos.set(todo, new Array());
        todo.value = '';
    }

    addPresent(param) {
        const key = param;
        const present = this.shadowRoot.querySelector('#current-present');
        const listaRegalos = this.todos.get(key);
        listaRegalos = [...this.listaRegalos, present.value];
        this.todos.set(key, listaRegalos);
        present.value = '';
    }

    deletePresent(e) {
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
                    ${this.todos.forEach(
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
                          @click="${this.addPresent(todo)}"
                          label="Agregar2"
                          ?disabled="${this.presents === ''}"
                        ></mwc-button>
                        ${this.presents.map(
                          (present) => html`
                            <mwc-check-list-item graphic="icon">
                              <slot>${present}</slot>
                              <mwc-icon
                                id=${present}
                                @click=${this.deletePresent}
                                slot="graphic"
                                >delete_forever</mwc-icon
                              >
                            </mwc-check-list-item>
                            <li divider role="separator"></li>
                          `
                        )}
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