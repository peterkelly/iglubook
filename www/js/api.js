var fakeTimeout = 1000;

var sampleUsers = [
    {
        id: 1,
        email: "demo@iglu.inet",
        password: "",
        firstName: "Demo",
        lastName: "User",
        gender: "M",
        country: "TH",
    },
    {
        id: 2,
        email: "jennifer@iglubook.com",
        password: "",
        firstName: "Jennifer",
        lastName: "Lawrence",
        gender: "F",
        country: "US",
    },
    {
        id: 3,
        email: "robert@iglubook.com",
        password: "",
        firstName: "Robert",
        lastName: "Downey Jr",
        gender: "M",
        country: "US",
    },
    {
        id: 4,
        email: "leo@iglubook.com",
        password: "",
        firstName: "Leonardo",
        lastName: "DiCaprio",
        gender: "M",
        country: "US",
    },
    {
        id: 5,
        email: "brad@iglubook.com",
        password: "",
        firstName: "Bradley",
        lastName: "Cooper",
        gender: "M",
        country: "US",
    },
    {
        id: 6,
        email: "the@rock.com",
        password: "",
        firstName: "Dwayne",
        lastName: "Johnson",
        gender: "M",
        country: "US",
    },
    {
        id: 7,
        email: "hugh@iglubook.com",
        password: "",
        firstName: "Hugh",
        lastName: "Jackman",
        gender: "M",
        country: "AU",
    },
    {
        id: 8,
        email: "sandra@iglubook.com",
        password: "",
        firstName: "Sandra",
        lastName: "Bullock",
        gender: "F",
        country: "US",
    },
    {
        id: 9,
        email: "scarlett@iglubook.com",
        password: "",
        firstName: "Scarlett",
        lastName: "Johansson",
        gender: "F",
        country: "US",
    },
];

var samplePosts = [
    {
        id: 1,
        posterId: 2,
        posterFullName: "Jennifer Lawrence",
        date: "10 July 10:14am",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat "+
        "egestas pretium. Nunc pellentesque venenatis felis sit amet ullamcorper. Phasellus arcu "+
        "lacus, placerat eu est quis, bibendum hendrerit dolor. Sed ac sem tellus. Mauris "+
        "tristique, ante ut sodales placerat, nisi ex faucibus elit, eu pretium felis mi et metus.",
        likes: 4,
        comments: 0,
    },
    {
        id: 2,
        posterId: 3,
        posterFullName: "Robert Downey Jr",
        date: "11 July 2:35pm",
        content: "Maecenas nec mi auctor, euismod ligula imperdiet, vulputate nisi. Vivamus "+
        "luctus eros et mattis faucibus. Suspendisse potenti. In hac habitasse platea dictumst. "+
        "Ut venenatis, lacus vel suscipit placerat, leo ipsum tincidunt dui, quis pellentesque "+
        "nibh justo et est.",
        likes: 17,
        comments: 5,
    },
    {
        id: 3,
        posterId: 4,
        posterFullName: "Leonardo DiCaprio",
        date: "11 July 4:20pm",
        content: "Fusce felis nisl, cursus quis malesuada sed, varius et sapien. Pellentesque "+
        "sed porta turpis. Morbi varius enim et massa tristique, et fermentum purus congue.",
        likes: 11,
        comments: 3,
    },
    {
        id: 4,
        posterId: 5,
        posterFullName: "Bradley Cooper",
        date: "11 July 5:50pm",
        content: "Etiam luctus arcu at tincidunt pellentesque. Donec eu quam risus. Cras "+
        "commodo sapien at diam gravida lobortis. Quisque ac nisl eu nisi fringilla blandit eu "+
        "ac elit. Mauris commodo eleifend mattis. Praesent volutpat fringilla dictum. Etiam "+
        "viverra ultricies dolor ut bibendum. Sed ullamcorper pretium sem nec suscipit.",
        likes: 0,
        comments: 19,
    },
    {
        id: 5,
        posterId: 6,
        posterFullName: "Dwayne Johnson",
        date: "12 July 11:20am",
        content: "Aliquam rutrum dignissim nibh. Donec in metus nec lacus sodales imperdiet. "+
        "Mauris cursus blandit magna, a accumsan felis porttitor et. Etiam a libero a ante "+
        "tincidunt fringilla id et ante. Mauris a lacus eu eros pharetra imperdiet id quis metus. "+
        "Fusce at libero dui.",
        likes: 6,
        comments: 2,
    },
    {
        id: 6,
        posterId: 7,
        posterFullName: "Hugh Jackman",
        date: "12 July 12:39pm",
        content: "Nam suscipit consequat nulla, vitae sodales magna mattis blandit. Donec "+
        "vehicula mattis quam, nec sodales tellus sagittis interdum.",
        likes: 10,
        comments: 6,
    },
    {
        id: 7,
        posterId: 8,
        posterFullName: "Sandra Bullock",
        date: "13 July 15:22pm",
        content: "Donec id augue dapibus, imperdiet purus id, condimentum augue. Cras sodales "+
        "enim magna, ut fringilla justo luctus sit amet. Ut ornare gravida porttitor. Vivamus sit "+
        "amet augue aliquet, finibus augue nec, pharetra metus. Vestibulum non nisi id lorem "+
        "maximus feugiat eget ut ex.",
        likes: 3,
        comments: 3,
    },
    {
        id: 8,
        posterId: 9,
        posterFullName: "Scarlett Johansson",
        date: "13 July 18:59pm",
        content: "Maecenas fringilla ornare consectetur. Vestibulum at laoreet augue. Duis id "+
        "fringilla massa, vitae imperdiet leo. Pellentesque eu gravida diam. Morbi venenatis "+
        "pellentesque nisl ac porta. Donec sollicitudin urna massa, ac molestie urna cursus in.",
        likes: 15,
        comments: 6,
    },
];

function deepCopy(value) {
    if (typeof(value) !== "object")
        return value;

    if (value instanceof Array) {
        var result = [];
        for (var i = 0; i < value.length; i++)
            result.push(deepCopy(value[i]));
        return result;
    }
    else {
        var result = {};
        for (var key in value) {
            result[key] = deepCopy(value[key]);
        }
        return result;
    }
}

app.service("api",function($timeout,$q,$http) {
    var nextPostId = 10;


    return {
        getFeedContents: function() {
            return $q(function(resolve,reject) {
                $timeout(function() {
                    resolve(deepCopy(samplePosts));
                },fakeTimeout);
            });
        },
        getFriends: function() {
            return $q(function(resolve,reject) {
                $timeout(function() {
                    resolve(deepCopy(sampleUsers));
                },fakeTimeout);
            });
        },
        getUser: function() {
            return $q(function(resolve,reject) {
                $timeout(function() {
                    resolve(deepCopy(sampleUsers[0]));
                },fakeTimeout);
            });
        },
        newPost: function(date,content) {
            var postId = nextPostId++;
            var post = {
                id: postId,
                posterId: sampleUsers[0].id,
                posterFullName: sampleUsers[0].firstName+" "+sampleUsers[0].lastName,
                date: date.toString(),
                content: content,
                likes: 0,
                comments: 0,
            };
            samplePosts.splice(0,0,post);

            return $q(function(resolve,reject) {
                $timeout(function() {
                    resolve(deepCopy(post));
                },fakeTimeout);
            });
        },
        likePost: function(post) {
            return $q(function(resolve,reject) {
                $timeout(function() {
                    var resultPost = null;
                    for (var i = 0; i < samplePosts.length; i++) {
                        if (samplePosts[i].id == post.id) {
                            samplePosts[i].likes++;
                            resultPost = deepCopy(samplePosts[i]);
                        }
                    }
                    resolve(resultPost);
                },fakeTimeout);
            });
        },
        //     return $q(function(resolve,reject) {
        //         $http({
        //             method: "GET",
        //             url: "http://localhost:3000/posts",
        //         }).then(function(response) {
        //             console.log("Resposne",response);
        //             resolve(response.data);
        //         }).catch(function(error) {
        //             reject(error);
        //         });
        //     });
        // }
    }
});