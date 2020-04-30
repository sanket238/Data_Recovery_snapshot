PACKAGE=pichu
FILES=$(shell find $(PACKAGE) -iname '*.py')

help:
	@for f in $(MAKEFILE_LIST) ; do \
		echo "$$f:" ; \
		grep -E '^[a-zA-Z_-%]+:.*?## .*$$' $$f | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' ; \
	done ; \

clean: clean-build clean-pyc clean-test ## remove all build, test, coverage and Python artifacts

clean-build:  ## remove build artifacts
	find -name '*.sqlite3' -delete
	rm -rf build/ dist/ .eggs/
	rm -rf '*.egg-info'
	rm -rf '*.egg'

clean-pyc:  ## remove Python file artifacts
	find -name '*.pyc' -delete
	find -name '*.pyo' -delete
	find -name '*~' -delete
	find -name '__pycache__' -delete

clean-test:  ## remove test and coverage artifacts
	rm -rf .tox/ .coverage htmlcov/ .pytest_cache/

lint:  ## run pre-commit hooks on all files
	if python -c "import sys; exit(1) if sys.version_info.major < 3 else exit(0)"; then \
		pre-commit run --all-files ; \
	fi

coverage: ## test and check code coverage
	pytest --cov=. --cov-report=html --cov-report term-missing

test:  ## run tests
	pytest

install: ## install packages from requirements.txt
	pip install -r requirements.txt

install-dev:  ## install dev packages, essential for development, linting, formatting, etc
	pip install -U rope flake8
