#docker build -t mlinnem/react-universal-web-apps .

FROM ubuntu

# Create app directory

RUN apt-get update

RUN apt-get -qq -y install curl

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

#RUN ln -s `which nodejs` /usr/bin/node


#RUN yes | apt-get install npm

RUN mkdir -p /root/dev/projects

EXPOSE 6001
EXPOSE 3001

# mount your local directory with source code files like so:
# docker run -d -p 3000:6001 --name react-universal-web-apps -v "/c/Users/Micah Linnemeier/Documents/dev/projects":/root/dev/projects/ mlinnem/react-universal-web-apps
# docker run -i -t -p 3000:6001 -v /root/dev/projects/:"/c/Users/Micah Linnemeier/Documents/dev/projects" mlinnem/react-universal-web-apps


# then start a terminal session like so: docker run -it bate bash
ENTRYPOINT ["/bin/sh", "-c"]
CMD /bin/bash


#If you run npm install, run it as "npm install --no-bin-links"
