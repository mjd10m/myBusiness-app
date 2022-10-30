INSERT INTO department (name)
VALUES
    ('Racing'),
    ('Factory'),
    ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Driver', 300000, 1),
    ('Team Principal', 500000, 1),
    ('Race Engineer', 100000, 1),
    ('Race Strategist', 60000, 1),
    ('Chief Technical Engineer', 250000, 2),
    ('Car Engineer', 80000, 2),
    ('Mechanic', 60000, 2),
    ('Marketing President', 150000, 3),
    ('Marketing Manager', 75000, 3),
    ('Marketing Analyst', 40000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Toto', 'Wolff', 2, NULL),
    ('Lewis', 'Hamilton', 1, 1),
    ('George', 'Russel', 1, 1),
    ('Jerry', 'Wilson', 3, 1),
    ('Jeff', 'Smith', 4, 4),
    ('Jane', 'Castor', 4, 4),
    ('Thierry', 'Justice', 5, NULL),
    ('Naveed', 'Mccann', 6, 7),
    ('Zahara', 'Bevan', 6, 7),
    ('Fox', 'Worthington', 7, 8),
    ('Roberto', 'Farmer', 7, 8),
    ('Kayan', 'Head', 7, 9),
    ('Chloe-Louise', 'Washington', 8, NULL),
    ('Tiffany', 'Neal', 9, 13),
    ('Kaiser', 'Paul', 10, 14),
    ('Cristina', 'Bennett', 10, 14);
