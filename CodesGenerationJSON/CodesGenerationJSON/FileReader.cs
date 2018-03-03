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
            bool error_after_sumary = false;
            bool success_after_sumary = false;
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
        private Dictionary<string, string> findReferentAttribute(string line, Error err)
        {
            Dictionary<string, string> item = new Dictionary<string, string>();
            string[] words = line.Split(' ');

            foreach(string word in words)
            {

                if (line.Substring(0, 1).Equals("+") || line.Substring(0, 1).Equals("-"))
                {
                    item.Add("code", line);
                    break;
                }
                else if (word.Equals(KeyWord.EXPLANATION))
                {

                }
            }
            return item;
        }
    }
}
