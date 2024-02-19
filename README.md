# student_management

This project is under development

client: vanilla JavaScript with VScode extension Live Preview   
server: Laravel Breeze API stack

ERD below is written in Mermaid

```mermaid
---
title: Students management
---
erDiagram
    STUDENTS ||--|{ ATTENDANCE_RECORDS : "have"
    LEAVE_RECORDS o|--|{ATTENDANCE_RECORDS: "exist in"
    STUDENTS ||--|| REGISTRATION_TOKENS : "registered with"

   ADMINS {
    int id pk
    varchar(255) name
    varchar(255) email uk
    varchar(255) password
   }

   STUDENTS {
    int id pk
    varchar(255) name
    varchar(255) email uk
    varchar(15) phone uk
    varchar(255) password
    date start_date
	date proposed_leave_date
    date leave_date
   }

  ATTENDANCE_RECORDS {
    int id pk
    int student_id fk
    date date
    time arrived_time
    time left_time
    enum leaveSpan "['none', 'whole', 'morning', 'afternoon']"
    int leave_id fk 
  }

    LEAVE_RECORDS {
    int id pk
    enum type "['personal', 'sick', 'compassionate']"
    text reason
    blob attachment
  }

  REGISTRATION_TOKENS {
    int id pk
    int student_id fk
    varchar(255) proposed_username
    char(10) value uk
    boolean is_valid
    datetime expired_time
    datetime used_time
  }
```