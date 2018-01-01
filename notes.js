



// if image is vertical
context.rotate(90 * Math.PI / 180);
context.drawImage(image, 0, -150, 200, 115);

//OUTER LIMIT canvas200x200
context.drawImage(image, 0, 0, 200, 115);
context.getImageData(398, 228, 1, 1)


// getting data back from canvas
    Promise.all([p1, p2])
      .then((result) => {
        cal = (result[0])
        mod = (result[1])
        console.log(Object.keys(cal).length)
      })
