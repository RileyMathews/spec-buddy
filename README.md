# Spec Buddy

## Instructions

Use this extension to quickly open up the test file that corresponds to your currently open file.

The extension searches for test files with the following assumptions.

1. All of your tests live under a top level directory named test, tests, spec, or specs.
1. Your test file name contains the exact wording of your source code file as a substring. The search is currently extremely fuzzy and may find the wrong files if you do not follow a strict naming convention where your test files contain the exact name of your source file.

For example...

| Source File Name    | Test File Name        | Match                                                |
|---------------------|-----------------------|------------------------------------------------------|
| client.rb           | client_spec.rb        | yes, 'client_spec' contains 'client'                 |
| email_controller.py | email_test.py         | no, 'email_test' does not contain 'email_controller' |
| email.rb            | email_service_spec.rb | yes, 'email_service_spec' contains 'email'           |

## Running the search

You can either use the command pallet `cmd + shift + p` and search for 'Open Spec File'.

Or you can create a keybinding for the command 'specBuddy.openSpec'.
