function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let petals = [];
let flowerX;
let flowerY;
let hoverDistance = 40;

let petalsMoved = false; // Variable para rastrear si los pétalos ya se han movido

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 200, 200); // Fondo rosa claro

  flowerX = width / 2;
  flowerY = height / 2; // Centrar la flor verticalmente

  // Crear los pétalos iniciales
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    let petalX = flowerX + cos(angle) * 100;
    let petalY = flowerY + sin(angle) * 100;
    petals.push(new Petal(petalX, petalY, i + 1));
  }
}

function draw() {
  clear(); // Borra el lienzo en cada fotograma

  // Texto en la parte superior
  textSize(32);
  textAlign(CENTER);
  textFont('Times New Roman');
  fill(0); // Texto negro
  text('Javiera Iturrieta', width / 2, 50);

  textSize(18); // Texto más pequeño
  let textY = 100;
  let lineHeight = 25;
  let textContent = [
    'Estudiante de Primer Año de Diseño en la Pontificia Universidad Católica de Valparaíso.',
    'Año de ingreso 2023.',
    'A continuación se encuentran los trabajos realizados en el curso de Imagen Escrita 2023,',
    'impartido por el profesor Herbert Spencer.'
  ];

  for (let i = 0; i < textContent.length; i++) {
    text(textContent[i], width / 2, textY + i * lineHeight);
  }

  // Dibujar la flor
  noStroke();

  // Centro violeta de la flor
  fill(148, 0, 211); // Violeta
  ellipse(flowerX, flowerY, 60, 60);

  // Pétalos de la flor
  for (let i = 0; i < petals.length; i++) {
    let petal = petals[i];
    petal.checkHover(mouseX, mouseY);
    petal.display();
    petal.move();
  }

  // Recuadro de texto debajo de la flor
  fill(150, 255, 255); // Color turquesa pálido
  rect(50, height - 150, width - 100, 100);

  fill(0);
  textSize(16);
  textAlign(LEFT);
  text('Sobre mi\nCorreo Electrónico: javiera.iturrieta.r@mail.pucv.cl', 70, height - 130);
  
  // Enlace a "Otros proyectos"
  fill(0, 0, 255);
  let otrosProyectosText = 'Otros proyectos';
  let otrosProyectosTextWidth = textWidth(otrosProyectosText);
  text(otrosProyectosText, 70, height - 100, otrosProyectosTextWidth);
  
  // Verificar si se hace clic en el enlace "Otros proyectos"
  if (mouseX > 70 && mouseX < 70 + otrosProyectosTextWidth && mouseY > height - 100 && mouseY < height - 80) {
    cursor(HAND);
    if (mouseIsPressed) {
      window.open('https://wiki.ead.pucv.cl/Javiera_Iturrieta');
    }
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  let distance = dist(mouseX, mouseY, flowerX, flowerY);
  if (distance < 30) {
    // Si se hace clic en el centro de la flor, activar el movimiento de los pétalos
    for (let i = 0; i < petals.length; i++) {
      petals[i].startMoving();
    }
  } else {
    for (let i = 0; petals.length; i++) {
      petals[i].checkClick(mouseX, mouseY);
    }
  }
}

class Petal {
  constructor(x, y, number) {
    this.x = x;
    this.y = y;
    this.targetX = random(width);
    this.targetY = random(height);
    this.isMoving = false;
    this.isHovered = false;
    this.colorChanged = false;
    this.number = number;
  }

  startMoving() {
    this.isMoving = true;
  }

  move() {
    if (this.isMoving) {
      let stepX = (this.targetX - this.x) * 0.05;
      let stepY = (this.targetY - this.y) * 0.05;
      this.x += stepX;
      this.y += stepY;
    }
  }

  checkHover(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    if (d < hoverDistance) {
      this.isHovered = true;
    } else {
      this.isHovered = false;
    }
  }

  checkClick(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    if (d < 35) {
      // Abre la página correspondiente al hacer clic en un pétalo
      switch (this.number) {
        case 1:
          window.open('https://javieraiturrieta.github.io/ie2023-01/');
          break;
        case 2:
          window.open('https://javieraiturrieta.github.io/ie2023-02/');
          break;
        case 3:
          window.open('https://javieraiturrieta.github.io/ie2023-03/');
          break;
        case 4:
          window.open('https://javieraiturrieta.github.io/ie23-04/');
          break;
        case 5:
          window.open('https://javieraiturrieta.github.io/ie2023-05/');
          break;
        case 6:
          window.open('https://javieraiturrieta.github.io/ie2023-tarea-6/');
          break;
        default:
          break;
      }
    }
  }

  display() {
    if (this.isHovered) {
      fill(255, 0, 0); // Color cuando se hace hover
    } else {
      fill(this.isMoving ? color(random(255), random(255), random(255)) : 148, 0, 211);
    }
    ellipse(this.x, this.y, 70, 70); // Tamaño del pétalo

    fill(255); // Color blanco para el número
    textSize(20);
    textAlign(CENTER, CENTER);
    text(this.number, this.x, this.y);
  }
}















