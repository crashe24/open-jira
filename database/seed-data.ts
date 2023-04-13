interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string,
    status: string,
    createAt: number,
}

export const seedData: SeedData = {
    entries: [
        { 
            
            description: 'PENDIENTE lorem iddididid',
            status: 'pending',
            createAt: Date.now() },
        {
            
            description: 'IN PROGRESS lorem2 iddididid',
            status: 'in-progress',
            createAt: Date.now()-10000 },
         { 
            
            description: 'FINISHED lorem3 iddididid',
            status: 'finished',
            createAt: Date.now()-100000 },
    ]
}