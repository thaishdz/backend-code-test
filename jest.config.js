

module.exports = {
    preset: 'ts-jest',  // Usa ts-jest para compilar archivos .ts
    // Indica la ubicación de los archivos de prueba
    testMatch: [
      "<rootDir>/src/**/*.{test,spec}.ts"
    ],
    // Para que jest también busque en subcarpetas dentro de /src
    roots: ["<rootDir>/src"]
};