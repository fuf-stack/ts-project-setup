PWD := $(shell pwd)

# list available targets
list:
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | grep -E -v -e '^[^[:alnum:]]' -e '^$@$$'

clean:
	sh ./scripts/cleanup-repository.sh;

install:
	# setup pnpm
	# see: https://pnpm.io/installation#on-posix-systems
	pnpm --help > /dev/null 2>&1 || curl -fsSL https://get.pnpm.io/install.sh | sh -;
	pnpm self-update $(shell grep packageManager package.json | cut -d'"' -f4 | cut -d'@' -f2);

	# setup node version
	# see: https://pnpm.io/cli/runtime
	pnpm runtime set node --global `cat .nvmrc`;

	# install node modules
	pnpm install --ignore-scripts;
	pnpm build;

test:
	@$(MAKE) install;
	pnpm test;
