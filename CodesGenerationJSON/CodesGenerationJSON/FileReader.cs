using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace CodesGenerationJSON
{
    class FileReader : IFileReader
    {

        object IFileReader.generateJsonFromFileRead(Db2CodeStyle style)
        {
            throw new NotImplementedException();
        }

        void IFileReader.readFile(string filePath)
        {
            FileStream stream = File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            BufferedStream buffer = new BufferedStream(stream);
            StreamReader reader = new StreamReader(buffer);

            string line;
            while((line = reader.ReadLine()) != null)
            {

            }
        }
    }
}
