PWD := $(shell pwd)

# list available targets
list:
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | grep -E -v -e '^[^[:alnum:]]' -e '^$@$$'

clean:
	sh ./scripts/cleanupRepository.sh;

install:
	# see: https://pnpm.io/installation#on-posix-systems
	pnpm --help > /dev/null 2>&1 || curl -fsSL https://get.pnpm.io/install.sh | sh -;
	pnpm env use --global `cat .nvmrc`;
	pnpm install --ignore-scripts;
	pnpm husky install;
	pnpm build;
