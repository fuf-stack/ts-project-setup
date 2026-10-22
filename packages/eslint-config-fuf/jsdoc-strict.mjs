import jsdoc from 'eslint-plugin-jsdoc';

// Keep this preset focused on direct interface members. These selectors exclude
// functions, object type aliases, nested object types, and call/construct signatures.
const interfaceMembers = [
  'TSInterfaceBody > TSPropertySignature',
  'TSInterfaceBody > TSMethodSignature',
  'TSInterfaceBody > TSIndexSignature',
];

export default [
  {
    name: 'fuf/jsdoc-strict',
    // Compose after base or react, which supplies the TypeScript parser.
    // JavaScript files do not opt into these documentation requirements.
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { jsdoc },
    rules: {
      // A normal // comment is not JSDoc: each selected member needs /** ... */.
      'jsdoc/require-jsdoc': [
        'error',
        {
          contexts: interfaceMembers,
          // Disable the plugin's default function-documentation requirement.
          require: { FunctionDeclaration: false },
          // Descriptions need human input; --fix must not create empty docblocks.
          enableFixer: false,
        },
      ],
      // Requiring a block alone would accept /** */ or tags with no explanation.
      // Require prose above any tags, even for @deprecated or @inheritdoc members.
      'jsdoc/require-description': [
        'error',
        { contexts: interfaceMembers, exemptedBy: [] },
      ],
    },
    // Sorting and spacing belong to base/react; opting into documentation adds
    // no new formatting requirements and preserves their blank-line groups.
  },
];
