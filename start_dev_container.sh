#!/bin/bash

docker run -i -t -p 8000:80 -v "/c/Users/Micah Linnemeier/Documents/dev/projects":/root/dev/projects/ --name name_of_app mlinnem/name_of_app
