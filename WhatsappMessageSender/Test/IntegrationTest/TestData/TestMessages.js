export default [
    {
        'message': {'Old #' :  1, 'Name' : 'Test Case 1', 'Text' : 'Test 1', 'Phone': -1}, 
        'asserts': {'Create New Message': true, 'Search Contact': true, 'Select Contact': true, 'Click Contact': true,
        'Send Message': true, 'Send Message Via WaMe': undefined }
    },

    {
        'message': {'Old #' :  2, 'Name' : 'Shiven kapur Dilli', 'Text' : 'Hi, How are you?', 'Phone': -1}, 
        'asserts': {'Create New Message': true, 'Search Contact': true, 'Select Contact': true, 'Click Contact': true,
        'Send Message': true, 'Send Message Via WaMe': undefined }
    },

    {
        'message': {'Old #' :  3, 'Name' : 'Youre never gonna find this', 'Text' : 'Hi, How are you?', 'Phone': '67426941'}, 
        'asserts': {'Create New Message': true, 'Search Contact': true, 'Select Contact': true, 'Click Contact': false,
        'Send Message': false, 'Send Message Via WaMe': true }
    }
]