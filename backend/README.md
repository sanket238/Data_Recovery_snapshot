# pichu

[![pipeline status](https://gitlab.com/skribble/pichu/badges/master/pipeline.svg)](https://gitlab.com/skribble/pichu/commits/master)
[![coverage report](https://gitlab.com/skribble/pichu/badges/master/coverage.svg)](https://gitlab.com/skribble/pichu/commits/master)

pichu is the backend for skribble app. Powered by [Django](https://www.djangoproject.com/).

## Enviroment Setup

pichu requires [python3.6](https://python.org) or above to work seamlessly.

Easiest way to setup python3.6 on your Ubuntu machine is.

```sh

sudo add-apt-repository ppa:jonathonf/python-3.6
sudo apt update

# install python
sudo apt install python3.6
sudo apt install python3.6-dev

# install pip supporting python3.6

wget https://bootstrap.pypa.io/get-pip.py
sudo python3.6 get-pip.py

python3.6 -V
# Python 3.6.X

pip3 -V
# pip 19.0.3 from /usr/bin/pip3 (python 3.6)

```

Once you have python and pip installed. Install virtualenv to setup a virtual enviroment for the project to run.

To install virtualenv.

```sh
pip3 install virtualenv
```

### Creating a virtual enviroment for project.

Once we have python3.6 and virtualenv installed. We can create a virtual enviroment for the project.

Run the following command in the project's root directory.

```sh
virtualenv venv -p python3.6
```

This will create a `venv` directory with its own python3.6 and pip3 binaries inside.

### Activating virtual enviroment `venv`.

To activate the virtual enviroment. Run following command.

```sh
source venv/bin/activate
```

This will use venv as the virtual enviroment. Now, the default `python` would be python 3.6 and default `pip` would use python 3.6 inside the virtual enviroment.

```sh
python -V
# Python 3.6.X

pip -V
# pip 19.0.3 from ./venv/lib/python3.6/site-packages/pip3 (python 3.6)
```

Now we're good to go.

## Installing Dependencies

```sh
pip install -r requirements.txt
```

## Starting Server

```sh
python ./manage.py runserver
```

And we are good to go!

## Makefile Scripts

Project contains various scripts to test, lint, clean the project.

To list the commands run

```sh
make help

# Makefile:
# clean-build     remove build artifacts
# clean           remove all build, test, coverage and Python artifacts
# clean-pyc       remove Python file artifacts
# clean-test      remove test and coverage artifacts
# coverage        test and check code coverage
# install-dev     install dev packages, essential for development, linting, formatting, etc
# install         install packages from requirements.txt
# lint            run pre-commit hooks on all files
# test            run tests
```
