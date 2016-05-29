var PDF = require('pdfkit');            //including the pdfkit module
var fs = require('fs');
var text = 'ANY_TEXT_YOU_WANT_TO_WRITE_IN_PDF_DOC';

doc = new PDF();                        //creating a new PDF object
doc.pipe(fs.createWriteStream('PATH_TO_PDF_FILE.pdf'));  //creating a write stream
            //to write the content on the file system
            doc.fontSize(25)
              .text('Here is some vector graphics...',100,80);

            doc.save()
              .moveTo(100,150)
              .lineTo(100,250)
              .lineTo(200,250)
              .fill("#FF3300");

            doc.circle(280,200,50)
              .fill("#6600FF");

              doc.scale(0.6)
               .translate(470, 130)
               .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
               .fill('red', 'even-odd')
               .restore();

            // and some justified text wrapped into columns
            doc.text('And here is some wrapped text...', 100, 300)
               .font('Times-Roman', 13)
               .moveDown()
               .text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque consequat lectus molestie congue. Fusce lorem tortor, congue vel lorem sit amet, feugiat aliquet nunc. Sed sit amet ipsum ullamcorper, elementum mauris in, interdum eros. In sit amet elit at quam iaculis varius sit amet nec neque. Nullam felis metus, vehicula ac porta non, aliquam nec nunc. Morbi pretium neque leo, sed viverra turpis mattis ac. Maecenas porttitor congue neque, ut suscipit arcu interdum id Etiam condimentum elit sit amet massa ornare pulvinar. Aenean quis eleifend orci, ac tempor neque. Phasellus erat ante, facilisis eget nunc eget, lobortis sollicitudin ipsum. Aenean sit amet venenatis nulla, vitae semper magna. Vivamus aliquet molestie congue. Aenean nec quam placerat, pretium ex ac, vehicula elit. Sed ornare libero sit amet nulla egestas, eget placerat massa aliquet. Quisque sollicitudin lacus tellus, nec convallis quam condimentum vel. Praesent scelerisque neque at arcu dictum, nec elementum nulla dapibus.Nulla in aliquam metus. Nam ac vulputate ex. Integer aliquam imperdiet hendrerit. Nam vitae suscipit nunc. Ut eu varius eros, in sagittis risus. Fusce at massa ligula. Donec ultricies risus eu nulla egestas condimentum. Proin pellentesque eros vulputate nulla euismod rhoncus ac eu augue. Suspendisse dapibus magna et convallis luctus. Etiam convallis ut est ac iaculis.Nullam eu maximus felis, in volutpat ipsum. Cras vel euismod orci, in hendrerit ante. Aenean quis nulla non ligula bibendum malesuada. Cras sed turpis sed nulla feugiat tempus ut ac nunc. Mauris ultricies augue condimentum auctor bibendum. Donec volutpat justo eu neque bibendum, et interdum erat commodo. Nam pellentesque tellus dolor, a efficitur mi convallis varius.Nulla in quam dolor. Vivamus dignissim nisl leo, quis aliquam nibh volutpat id. Suspendisse ut justo vitae neque imperdiet varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam luctus tortor sed dapibus vehicula. Sed ac mi et nulla laoreet pharetra. Ut placerat tincidunt eros, in auctor erat dictum at. Aliquam erat volutpat. Duis laoreet congue ligula. Maecenas congue elit id nisi ornare, quis blandit erat pulvinar. Vivamus fermentum quam ut urna molestie ullamcorper.", {
                 width: 412,
                 align: 'justify',
                 indent: 30,
                 columns: 2,
                 height: 300,
                 ellipsis: true
               });             //adding the text to be written,
            // more things can be added here including new pages
doc.end(); //we end the document writing.
