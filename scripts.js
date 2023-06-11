document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector('#draw');
    const ctx = canvas.getContext("2d");

    const clearBtn = document.querySelector('.clear')
     function clearCanvas(){

     ctx.clearRect(0,0, canvas.width, canvas.height)      }

     clearBtn.addEventListener('click', clearCanvas)

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = "#BADA55"; // color of the line
    ctx.lineJoin = "round";      // round edges of the line
    ctx.lineCap = "round";
    ctx.lineWidth = 50;

    

    let isDrawing = false;
    let lastX = 0;  
    let lastY = 0;
    let hue =0;

    let direction = true;

    function draw(e) {
      if (!isDrawing) return;
      console.log(e); 
      ctx.strokeStyle = `hsl(${hue}, 100%,50%)`;
   
      ctx.beginPath();
      // start from
      ctx.moveTo(lastX, lastY);
      // go to  
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];


      hue ++;
      if(hue>360){
        hue =0;
      }

      if(ctx.lineWidth >=100|| ctx.lineWidth <=1){
        direction =! direction;

      }
      if(direction){
        ctx.lineWidth++;
      }else{
        ctx.lineWidth--;
      }
    }
    function stopdrawing(){
  isDrawing = false;
}
function preventBounds(e){
  const canvasRect = canvas.getBoundingClientrect();
  if(e.clientX < canvas.rect.left||
  e.clientX < canvas.rect.right||
  e.clientY < canvas.rect.top||
  e.clientY < canvas.rect.bottom)
{
  stopdrawing();
}
}

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];

    });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', preventBounds);
    


  });
  const mediaQuery = window.matchMedia("(max-width: 800px)");

 
  const handleMediaQuery = (mq) => {
    if (mq.matches) {
     
      alert("Please try this on laptop");
    } else {
     return
    }
  };

 
  handleMediaQuery(mediaQuery);
  mediaQuery.addListener(handleMediaQuery);
