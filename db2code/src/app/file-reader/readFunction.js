function read(){
    var file = document.getElementById('file').files[0];
  
    var reader = new FileReader();
    reader.onload = function(progressEvent){
      // Entire file
      console.log(this.result);
    
      var node = document.createElement('p');
      var element = document.createTextNode(this.result);
      node.appendChild(element);
      var el = document.getElementById('teste');
      el.appendChild(element);
      
      // By lines
      var lines = this.result.split('\n');
      for(var line = 0; line < lines.length; line++){
        console.log(lines[line]);
      }
    };
    reader.readAsText(file);
  };
