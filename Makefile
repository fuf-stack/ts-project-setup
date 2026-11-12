PWD := $(shell pwd)

# list available targets
list:
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | grep -E -v -e '^[^[:alnum:]]' -e '^$@$$'

# remove generated artifacts and dependencies
clean:
	bash ./scripts/cleanup-repository.sh

# see: https://pnpm.io/installation#on-posix-systems
# see: https://pnpm.io/cli/runtime
install:
	@set -eu; \
	command -v pnpm >/dev/null 2>&1 || { echo "Install pnpm from a trusted source before running make install." >&2; exit 1; }; \
	PNPM_VERSION=$$(grep packageManager package.json | cut -d'"' -f4 | cut -d'@' -f2); \
	test -n "$$PNPM_VERSION"; \
	echo "Setting up pnpm v$$PNPM_VERSION..."; \
	if [ "$$(pnpm --version)" != "$$PNPM_VERSION" ]; then pnpm self-update "$$PNPM_VERSION"; fi; \
	test "$$(pnpm --version)" = "$$PNPM_VERSION"; \
	NODE_VERSION=$$(cat .nvmrc); \
	test -n "$$NODE_VERSION"; \
	echo "Setting up node v$$NODE_VERSION..."; \
	pnpm runtime set node --global "$$NODE_VERSION"; \
	pnpm install --ignore-scripts; \
	pnpm build; \
	pnpm husky;

# run test suite after install/bootstrap is complete
test: install
	clear;
	pnpm test;
