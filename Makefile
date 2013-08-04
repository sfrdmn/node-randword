test:
	@./node_modules/.bin/mocha \
		--growl \
		--reporter spec \
		spec/*.spec.js

.PHONY: test
