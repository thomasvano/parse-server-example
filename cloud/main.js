Parse.Cloud.define('hello', function(req, res) {
  return 'Hi';
});
Parse.Cloud.define('push', function(req, res) {
    var logMessage = "Push test";
    
    var params = req.params;
    var userId = params.userId;
    var data = params.data;
    
    console.log(logMessage);
    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("userId", userId);


    Parse.Push.send({
        where: pushQuery,
        data: data
    }, {
        useMasterKey: true,
        success: function() {
        // Push sent, send re
        res.success('Push Sent');
        var logMessage = "Push Sent!";
        console.log(logMessage);

    },
    error: function(error) {
        res.error(error)


        var logMessage = error;
        console.log(logMessage);
        // There was a problem :(
    }
    });


    var logMessage = "Push should be sent.";
    console.log(logMessage);

});
