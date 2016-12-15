var request = require('request');

// создадим 3 тестовые задачи

for (i in [1,2,3]) {
    request.put(
        'http://localhost:3000/api/v1/tasks/create',
        {json:{
            title: 'Задача '+i,
            description: 'Описание задачи '+i,
            status: 'open',
            user: 'Sergey'
        }},
        function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                console.log(`New task was created. ID: ${body}`);
            }
        }
    );
}

// создадим 5 пользователей

const names = ['Sergey', 'Irina', 'Alena', 'Ekaterina', 'Maxim'];
for (var i = 0; i <names.length; i++) {console.log(names[i]);
    request.put(
        'http://localhost:3000/api/v1/users/create',
        {json:{
            name: names[i]
        }},
        function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (!error && response.statusCode == 200) {
                console.log(`New user was created. ID: ${body}`);
            }
        }
    );
}

// получим список всех задач

request.get(
    'http://localhost:3000/api/v1/tasks',
    function (error, response, body) {
        if (error) {
            console.log(error);
        }
        if (!error && response.statusCode == 200) {
            let tasks = JSON.parse(body);

            let task = tasks[0];
            let taskToDelete = tasks[1];

            // возьмём задачу по id

            request.get(
                'http://localhost:3000/api/v1/tasks/'+task._id,
                function (error, response, body) {
                    if (error) {
                        console.log(error);
                    }
                    if (!error && response.statusCode == 200) {
                        console.log('Get by id: '+body);
                    }
                }
            );

            // назначим задачу на другого пользователя

            request.post(
                'http://localhost:3000/api/v1/tasks/'+task._id+'/delegate',
                {json:{
                    user: 'Miranda'
                }},
                function (error, response, body) {
                    if (error) {
                        console.log(error);
                    }
                    if (!error && response.statusCode == 200) {
                        console.log('Task updated!');

                        // поиск по задачам

                        request.post(
                            'http://localhost:3000/api/v1/tasks/search',
                            {json:{
                                string: 'Задача 0'
                            }},
                            function (error, response, body) {
                                if (error) {
                                    console.log(error);
                                }
                                if (!error && response.statusCode == 200) {
                                    console.log(body);
                                }
                            }
                        );

                        // отредактируем название и описание задачи

                        request.post(
                            'http://localhost:3000/api/v1/tasks/'+task._id+'/update',
                            {json:{
                                title: 'Задача обновленная',
                                description: 'Описание обновленной задачи'
                            }},
                            function (error, response, body) {
                                if (error) {
                                    console.log(error);
                                }
                                if (!error && response.statusCode == 200) {
                                    console.log(body);
                                }
                            }
                        );

                        // закроем задачу

                        request.post(
                            'http://localhost:3000/api/v1/tasks/'+task._id+'/toggle',
                            function (error, response, body) {
                                if (error) {
                                    console.log(error);
                                }
                                if (!error && response.statusCode == 200) {
                                    console.log(body);
                                }
                            }
                        );

                        // удалим задачу
                        request.delete(
                            'http://localhost:3000/api/v1/tasks/'+taskToDelete._id+'/delete',
                            function (error, response, body) {
                                if (error) {
                                    console.log(error);
                                }
                                if (!error && response.statusCode == 200) {
                                    console.log(body);
                                }
                            }
                        );

                    }
                }
            );
        }
    }
);
