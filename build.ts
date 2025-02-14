import type { BuildConfig } from 'bun'
import dts from 'bun-plugin-dts'

const defaultBuildConfig: BuildConfig = {
    entrypoints: ['./src/index.ts'],
    outdir: './dist'
}

await Promise.all([
    Bun.build({
        ...defaultBuildConfig,
        plugins: [dts(
            {
                libraries: {
                    importedLibraries: ['@prisma/client']
                },
                output: {
                    noBanner: true,
                    exportReferencedTypes: false
                }
            }
        )],
        format: 'esm',
        naming: "[dir]/[name].js",
    }),
    Bun.build({
        ...defaultBuildConfig,
        format: 'cjs',
        naming: "[dir]/[name].cjs",
    })
])