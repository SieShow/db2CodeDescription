using System;
using System.Collections.Generic;
using System.IO;

namespace CodesGenerationJSON
{
    class FileReader : IFileReader
    {

        object IFileReader.generateJsonFromFileRead(Db2CodeStyle style)
        {
            throw new NotImplementedException();
        }

        public void readFile(string filePath)
        {
            FileStream stream = File.Open(filePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            BufferedStream buffer = new BufferedStream(stream);
            StreamReader reader = new StreamReader(buffer);

            string line;
            Error errorObj = new Error();
            while((line = reader.ReadLine()) != null)
            {
                

            }
        }

        /// <summary>
        /// Find in a string if it represents a attribute of the object, if is, return the string 
        /// part as value and the attribute as key
        /// </summary>
        /// <param name="line"></param>
        private Dictionary<string, string> findReferentAttribute(string line)
        {
            Dictionary<string, string> item = new Dictionary<string, string>();
            string[] words = line.Split(' ');
            int auxobj;

            foreach(string word in words)
            {
                if(int.TryParse(word))) 
                {

                }
            }
            return item;
        }
    }
}
