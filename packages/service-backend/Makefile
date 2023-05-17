FUNCTION_NAME:=backend-$(SERVICE_ENV)

prepare:
	pnpm install --frozen-lockfile
build:
	npx webpack
	cp -r ../../script-docs/* ./dist/
package:
	zip -rq9 lambda.zip dist
upload:
	aws s3 cp ./lambda.zip s3://$(S3_PRIVATE_BUCKET)/lambda/$(FUNCTION_NAME).zip
deploy:
	aws lambda update-function-code \
		--region $(AWS_REGION) \
		--function-name $(FUNCTION_NAME) \
		--s3-bucket $(S3_PRIVATE_BUCKET) \
		--s3-key lambda/$(FUNCTION_NAME).zip --publish
clean:
	rm ./lambda.zip

all: prepare build package upload deploy clean
	@echo "Done"
