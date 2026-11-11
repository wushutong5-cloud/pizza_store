
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const openHour = 10;
const closeHour = 22;

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "/focaccia.jpg",
    soldOut: false,
    isPopular: true,
    category: "veg",
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "/margherita.jpg",
    soldOut: false,
    isPopular: false,
    category: "veg",
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "/spinaci.jpg",
    soldOut: false,
    isPopular: false,
    category: "veg",
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "/funghi.jpg",
    soldOut: false,
    isPopular: false,
    category: "veg",
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "/salamino.jpg",
    soldOut: true,
    isPopular: false,
    category: "meat",
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "/prosciutto.jpg",
    soldOut: false,
    isPopular: true,
    category: "meat",
  },
];

// Header Component
function Header() {
  return (
    <header className="header">
      <h1>Andy's Pizza Co.</h1>
    </header>
  );
}

// Pizza Component
function Pizza(props) {
  return (
    <li className={`pizza ${props.soldOut ? "sold-out" : ""}`}>
      <img src={props.image} alt={props.name} />

      <div>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <span>${props.price.toFixed(2)}</span>

        {props.soldOut && <small>Sold Out</small>}

        {props.isPopular && !props.soldOut && (
          <small className="badge">Chef's pick</small>
        )}
        {props.category === "veg" && !props.soldOut && (
          <small className="badge">Veg</small>
        )}
        {props.category === "meat" && !props.soldOut && (
          <small className="badge">Meat</small>
        )}
      </div>
    </li>
  );
}

// Menu Component
function Menu(props) {
  const numPizza = pizzaData.length;

  return (
    <section className="menu">
      <h2>Our Menu</h2>

      {props.isOpen && (
        <p>
          Authentic Italian cuisine, all from our oven
        </p>
      )}
      {numPizza > 0 ? (
        
        <ul className="pizzas">  
          {(() => {
            const vegPizzas = pizzaData.filter((pizza) => pizza.category === "veg");
            return vegPizzas.map((pizza) => (
              <Pizza
                key={pizza.name}
                image={pizza.photoName}
                name={pizza.name}
                description={pizza.ingredients}
                price={pizza.price}
                soldOut={pizza.soldOut}
                isPopular={pizza.isPopular}
                category={pizza.category}
              />
            ));
          })()}
          {(() => {
            const meatPizzas = pizzaData.filter((pizza) => pizza.category === "meat");
            return meatPizzas.map((pizza) => (
              <Pizza
                key={pizza.name}
                image={pizza.photoName}
                name={pizza.name}
                description={pizza.ingredients}
                price={pizza.price}
                soldOut={pizza.soldOut}
                isPopular={pizza.isPopular}
                category={pizza.category}
              />
            ));
          })()}
        </ul>
      ) : (
        <p>We're still working on our menu. Please come back later.</p>
      )}
    </section>
  );
}

// Footer Component
function Footer(props) {
  return (
    <Order
      isOpen={props.isOpen}
      openHour={openHour}
      closeHour={closeHour}
    />
  );
}

// Order Component
function Order(props) {
  if (props.isOpen) {
    return (
      <div className="order">
        <footer className="footer">
          We're open until {props.closeHour}:00. Come visit us or order online.
        </footer>

        <button className="btn">Order</button>
      </div>
    );
  }

  return (
    <div className="order">
      <footer className="footer">
        We're happy to welcome you between {props.openHour}:00 and{" "}
        {props.closeHour}:00.
      </footer>
    </div>
  );
}

// Main App
export default function App() {
  const hours = new Date().getHours();
  const isOpen = hours >= openHour && hours < closeHour;

  return (
    <div className="container">
      <Header />
      <Menu isOpen={isOpen} />
      <Footer isOpen={isOpen} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
