const ButtonStyle = {
  success: "success",
  error: "error",
  info: "info"
}

const root = document.getElementById("root")
root.appendChild(HomePage())

function HomePage() {
  const container = document.createElement('div')
  const { Modal, showModal } = AddItemModal({
    onCreate: (data) => console.log(data)
  })

  function onAddClick(columnId) {
    showModal(columnId)
  }

  container.appendChild(Header())
  container.appendChild(Board(onAddClick))
  container.appendChild(Modal)

  return container
}

function AddItemModal({ onCreate }) {
  let columnId = 0
  const content = document.createElement('div')
  const nameInput = Input({label: "Name"})
  content.appendChild(nameInput.input)

  const modal = Modal({
    title: `Add Item`,
    content,
    onCreate: () => {
      onCreate({
        columnId,
        name: nameInput.val()
      })
    },
  })
  const showModal = () => {
    modal.style.display = "block"
  }

  return {
    Modal: modal,
    showModal: (newColumnId) => {
      showModal()
      columnId = newColumnId
    }
  }
}

function Board(onAddClick) {
  const column1 = Column({
    title: "Column 1",
    cardsData: ["item1", "item2 fdsjfkajds dfaklj lkadsj klasdf asdlkf a"],
    onAddClick: () => onAddClick(1)
  })
  const column2 = Column({
    title: "Column 2",
    cardsData: ["item3"],
    onAddClick: () => onAddClick(2),
  })

  const column3 = Column({
    title: "Column 3",
    cardsData: ["item4", "item5", "item6"],
    onAddClick: () => onAddClick(3)
  })

  const content = List({ elements:[column1, column2, column3], gap: "10px", direction: "row" })
  content.style.margin = "18px"
  return content
}

function Header() {
  const container = document.createElement('div')
  container.style.padding = "5px"
  container.style.backgroundColor = "#DDD"
  container.appendChild(H2("TRELLO-CLONE"))

  return container
}

function H1(value) {
  const h1 = document.createElement('h1')
  h1.textContent = value
  return h1
}

function H2(value) {
  const h2 = document.createElement('h2')
  h2.textContent = value
  return h2
}

function P(value) {
  const p = document.createElement('p')
  p.textContent = value
  return p
}

function Input({label}) {
  const input = document.createElement('input')
  input.style.width = "100%"
  input.style.padding = "5px"

  const container = List({elements: [P(label), input], direction: "column", gap: "2px"})
  container.style.width = "100%"

  return {
    val: () => input.value,
    input: container
  }
}

function List({ elements, gap = "0px", direction = "row" }) {
  const List = document.createElement('div')
  List.style.display = "flex"
  List.style.gap = gap
  List.style.flexDirection = direction
  elements.forEach(el => List.appendChild(el))
  return List
}

function ColumnCard(content) {
  const container = document.createElement('div')
  container.style.boxShadow = slightShadow()
  container.style.backgroundColor = "white"
  container.style.padding = "8px"
  container.style.borderRadius = "4px"

  container.appendChild(P(content))

  return container
}

function Column({ title, cardsData, onAddClick }) {
  const spacing = "12px"
  const container = document.createElement('div')
  container.style.backgroundColor = "#DDD"
  container.style.width = "250px"
  container.style.borderRadius = "8px"
  container.style.padding = "8px"


  const columnCards = cardsData.map(cardData => ColumnCard(cardData))
  const listContainer = List({elements: columnCards, direction: "column", gap: spacing})
  listContainer.style.marginTop = spacing

  const addButton = Button({label: "Add", style: ButtonStyle.info, onClick: onAddClick})
  addButton.style.marginTop = spacing

  container.appendChild(H1(title))
  container.appendChild(listContainer)
  container.appendChild(addButton)

  return container
}

function Button({ label, onClick, style }) {
  const backgroundColor = () => {
    if (style === "success") return "rgb(52, 165, 114)"
    if (style === "info") return "rgb(69, 76, 225)"
    if (style === "error") return "red"
    return "#FFF"
  }

  const button = document.createElement('button')
  button.style.width = "100%"
  button.style.height = "35px"
  button.style.cursor = "pointer"
  button.style.border = "0"
  button.style.color = "white"
  button.style.fontWeight = "700"
  button.style.borderRadius = "4px"
  button.style.boxShadow = slightShadow()
  button.style.backgroundColor = backgroundColor()
  button.innerText = label
  button.addEventListener('click', (e) => {
    e.preventDefault()
    onClick()
  })
  return button
}

function Modal({title, content, onCreate = () => {}, onCancel = () => {}}) {
  const container = document.createElement('div')
  const backdrop = document.createElement('div')

  container.style.width = "100vw"
  container.style.height = "100vh"
  container.style.position = "absolute"
  container.style.top = "0"
  container.style.display = "none"

  backdrop.style.backgroundColor = "black"
  backdrop.style.width = "100%"
  backdrop.style.height = "100%"
  backdrop.style.opacity = "0.3"

  const modalContainer = document.createElement("div")
  modalContainer.style.position = "absolute"
  modalContainer.style.top = "50%"
  modalContainer.style.left = "50%"
  modalContainer.style.transform = "translate(-50%, -50%)"
  modalContainer.style.backgroundColor = "white"
  modalContainer.style.padding = "20px"
  modalContainer.style.borderRadius = "8px"
  modalContainer.style.width = "500px"
  modalContainer.style.display = "flex"
  modalContainer.style.flexDirection = "column"
  modalContainer.style.alignItems = "center"
  modalContainer.style.gap = "25px"

  const cancelButton = Button({
    label: "Cancel",
    style: ButtonStyle.error,
    onClick: () => {
      container.style.display = "none"
      onCancel()
    }
  })
  const createButton = Button({label: "Create", style: ButtonStyle.success, onClick: onCreate})
  const actions = List({elements: [cancelButton, createButton], gap: "10px"})
  actions.style.width = "80%"

  modalContainer.appendChild(H1(title))
  modalContainer.appendChild(content)
  modalContainer.appendChild(actions)
  container.appendChild(backdrop)
  container.appendChild(modalContainer)

  return container
}

function slightShadow() { return "2px 2px 3px #BBB" }