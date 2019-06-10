var params = {
    Bucket: 'bot-moderation'
  };

var s3DataContents = [];    // Single array of all combined S3 data.Contents

function s3Print() {
    if (program.al) {
        // --al: Print all objects
        console.log(JSON.stringify(s3DataContents, null, "    "));
    } else {
        // --b: Print key only, otherwise also print index
        var i;
        for (i = 0; i < s3DataContents.length; i++) {
            var head = !program.b ? (i+1) + ': ' : '';
            console.log(head + s3DataContents[i].Key);
        }
    }
}

function s3ListObjects(params, cb) {
    s3.listObjects(params, function(err, data) {
        if (err) {
            console.log("listS3Objects Error:", err);
        } else {
            var contents = data.Contents;
            s3DataContents = s3DataContents.concat(contents);
            if (data.IsTruncated) {
                // Set Marker to last returned key
                params.Marker = contents[contents.length-1].Key;
                s3ListObjects(params, cb);
            } else {
                cb();
            }
        }
    });
}

s3ListObjects(params, s3Print);
