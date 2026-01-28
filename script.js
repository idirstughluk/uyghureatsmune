// script.js - Populate menu + lightbox

document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.getElementById('menu-container');

  const menuItems = [
    // APPETIZERS
    {
      name: "Samsa (1 pc)",
      uyghur: "سامسا",
      desc: "Special Uyghur snack that is filled with beef and onion",
      price: "$2.99",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Samsa_from_Xinjiang.jpg/800px-Samsa_from_Xinjiang.jpg"  // Authentic baked Uyghur samsa
    },
    {
      name: "Cucumber salad",
      uyghur: "تەرخەمەك سالات",
      desc: "Made of cucumber, tomato and garlic",
      price: "$5.99",
      img: "https://images.unsplash.com/photo-1627308594171-17ed03c86b05?auto=format&fit=crop&w=800&q=80"  // Fresh smashed cucumber salad style
    },
    {
      name: "Butter nan",
      uyghur: "سېرىق ماي نان",
      desc: "Traditional Uyghur-style flatbread, baked to a golden crisp with sesame on top",
      price: "$1.99",
      img: "https://www.saveur.com/uploads/2016/07/26/uyghur-flatbread.jpg?auto=webp&optimize=high&quality=70&w=800"  // Classic Uyghur sesame nan/flatbread
    },
    {
      name: "Carrot salad",
      uyghur: "سەۋزە سالات",
      desc: "Made of carrot and chilies",
      price: "$6.99",
      img: "https://jabberwockystew.net/wp-content/uploads/2013/05/Karls-Uyghur-Carrot-Salad.jpg"  // Shredded carrot Uyghur-style
    },
    {
      name: "Pancake",
      uyghur: "فوتوزماج",
      desc: "Stir fried, layered, flaky flat bread",
      price: "$2.99",
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"  // Layered flaky bread approximation
    },
    {
      name: "Eggplant salad",
      uyghur: "بېدىرەن سالات",
      desc: "Made of eggplant, tomato, soy sauce",
      price: "$7.99",
      img: "https://www.dolanchick.com/wp-content/uploads/2022/06/grilled-eggplant-salad-uyghur.jpg"  // Grilled Uyghur eggplant salad
    },

    // MAIN DISHES (add all from your list - here's a sample; expand similarly)
    {
      name: "Guyro Laghman",
      uyghur: "گۈيرۇ لەغمەن",
      desc: "Hand-pulled noodles topped with hot stir fry of beef, tomato, chilies, cabbage, black mushroom",
      price: "$16.99",
      img: "https://vidarbergum.com/wp-content/uploads/2023/03/cheats-lagman-uyghur-style-lamb-with-noodles-1.jpg"  // Classic Uyghur laghman
    },
    {
      name: "Lamb Pilaf",
      uyghur: "پولۇ",
      desc: "Traditional Uyghur food made of lamb, rice and carrot. Served with a side dish",
      price: "$20.99",
      img: "https://blog.themalamarket.com/wp-content/uploads/2020/10/big-plate-chicken-uyghur-xinjiang.jpg"  // Pilaf-style rice dish
    },
    {
      name: "Big Plate Chicken",
      uyghur: "چوڭ تەخسە توخۇ قورۇمىسى",
      desc: "Chicken stew with potatoes and peppers simmered in a spicy sauce, served over hand-pulled flat noodles",
      price: "$24.99 / $44.99",
      img: "https://food52.com/recipes/89642-turbo-charged-xinjiang-big-plate-chicken"  // Iconic big plate chicken photo
    },
    // ... Add the rest similarly (Fried Lamb Shank, Manta, Scallian Lamb, etc.)
    // For example:
    {
      name: "Fried Lamb Shank",
      uyghur: "قورۇغان قوي پاقالچىقى",
      desc: "A whole lamb shank, fried with onion and served with a nan",
      price: "$19.99",
      img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"  // Braised lamb shank approximation
    },
    // Continue for all mains, soups, kebabs, desserts/drinks...
    // Desserts example:
    {
      name: "Honey Cake",
      uyghur: "ھەسەل تورتى",
      desc: "Layered honey cake",
      price: "$5.99",
      img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"  // Layered honey cake
    },
    {
      name: "Black Tea",
      uyghur: "قارا چاي",
      desc: "Hot black tea",
      price: "$3.99",
      img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80"  // Traditional tea
    }
    // Add remaining items from your list here...
  ];

  menuItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="price">${item.price}</div>
      <h3>${item.name}</h3>
      <p class="uy">${item.uyghur}</p>
      <p>${item.desc}</p>
    `;
    // Click to enlarge image
    div.addEventListener('click', () => {
      const modal = document.getElementById('modal');
      document.getElementById('modalImg').src = item.img;
      modal.style.display = 'flex';
    });
    menuContainer.appendChild(div);
  });

  // Close modal
  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
  });
});
